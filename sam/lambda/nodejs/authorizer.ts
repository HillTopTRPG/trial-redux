import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import {DynamoDBDocumentClient, QueryCommand, QueryCommandOutput} from '@aws-sdk/lib-dynamodb'
export const ddbDocClient = DynamoDBDocumentClient.from(new DynamoDBClient({}))

async function getTokenData<T>(tableName: string, token: string, tokenName: string): Promise<T | null> {
  try {
    const data: QueryCommandOutput = await ddbDocClient.send(new QueryCommand({
      TableName : tableName,
      IndexName: `${tokenName}-index`,
      KeyConditionExpression: '#token = :token',
      ExpressionAttributeNames: {
        '#token' : tokenName
      },
      ExpressionAttributeValues: {
        ':token': token
      }
    }))
    if (data && data.Items.length === 1 && Boolean(data.Items[0])) {
      return data.Items[0] as T
    }
  } catch (err) {
    // do nothing
  }
  return null
}

const ALL_OPERATIONS = [
  'Mutation.addProject',
  'Mutation.addUser',
  'Mutation.deleteProject',
  'Mutation.updateProject',
  'Query.projects',
  'Query.users',
]

export const handler = async event => {
  console.log(`event >`, JSON.stringify(event, null, 2))

  // const typesBase = `arn:aws:appsync:${process.env.AWS_REGION}:${event.accountId}:apis/${event.apiId}/types`
  const deniedFieldsBase = [
    // `${typesBase}/Room/fields/password`,
  ]
  const admitFields: string[] = []

  let isAuthorized = false
  let id: string | null = null

  const token = event.authorizationToken
  if (token === 'react-sample') {
    isAuthorized = true
    admitFields.push('Mutation.addProject')
    admitFields.push('Mutation.addUser')
    admitFields.push('Mutation.deleteProject')
    admitFields.push('Mutation.updateProject')
    admitFields.push('Query.projects')
    admitFields.push('Query.users')
  } else {
    const userData = await getTokenData<{ id: string }>(process.env.USER_TABLE_NAME, token, 'token')
    if (userData) {
      isAuthorized = true
      id = userData.id
      admitFields.push('Mutation.addProject')
      admitFields.push('Mutation.addUser')
      admitFields.push('Mutation.deleteProject')
      admitFields.push('Mutation.updateProject')
      admitFields.push('Query.projects')
      admitFields.push('Query.users')
    }
  }

  const response = {
    isAuthorized,
    resolverContext: {
      id,
    },
    deniedFields: [
      ...deniedFieldsBase,
      ...ALL_OPERATIONS.filter(d => admitFields.every(a => a !== d)),
    ],
    ttlOverride: 0,
  }

  console.log(`response >`, JSON.stringify(response, null, 2))
  return response;
}
