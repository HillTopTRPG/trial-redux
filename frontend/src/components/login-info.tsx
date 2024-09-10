import { useEffect } from 'react'
import '../App.css'
import { useAuth0 } from '@auth0/auth0-react'
import LoginButton from '../components/login-button.tsx'
import LogoutButton from '../components/logout-button.tsx'


function LoginInfo() {
  const { isAuthenticated, user, isLoading } = useAuth0()

  useEffect(() => {
    console.log(JSON.stringify({isAuthenticated, user, isLoading}, null, 2))
  }, [isAuthenticated, user, isLoading])

  if (isLoading) {
    return <div>Loading ...</div>
  }

  return isAuthenticated ? (
    <>
      <div>認証後</div>
      <LogoutButton />
      { user && <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div> }
    </>
  ) : (
    <>
      <div>認証前</div>
      <LoginButton />
    </>
  )
}

export default LoginInfo
