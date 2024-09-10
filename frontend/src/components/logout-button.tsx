import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import styled from 'styled-components'

const LogoutButton: React.VFC = () => {
  const { logout } = useAuth0()

  return (
    <Button
      onClick={() => {
        logout({ logoutParams: { returnTo: window.location.origin } })
      }}
    >
      ログアウト
    </Button>
  )
}

export default LogoutButton

const Button = styled.button`
  width: 150px;
  height: 50px;
  border-radius: 25px;
  background-color: #db5c8d;
`
