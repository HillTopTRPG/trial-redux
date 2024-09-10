export const handler = async () => ({
    statusCode: 200,
    body: JSON.stringify({
        graphql: process.env.GRAPHQL_URL,
        region: process.env.REGION
    })
})
