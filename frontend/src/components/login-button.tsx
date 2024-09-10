import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import styled from 'styled-components'

const LoginButton: React.VFC = () => {
  const { loginWithRedirect } = useAuth0()

  return <Button onClick={() => loginWithRedirect()}>ログイン</Button>;
}

const Button = styled.button`
  width: 150px;
  height: 50px;
  border-radius: 25px;
  background-color: #3bcee2;
`

export default LoginButton