import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { store } from './app/store'
import { Provider } from 'react-redux'
import { Auth0Provider } from '@auth0/auth0-react'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Auth0Provider
      domain="dev-1htjnmrmwf6t62tm.jp.auth0.com"
      clientId="uZfVNpVEx1oGJkRFyFQwvQoKs4Znzam3"
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
      <Provider store={store}>
        <App />
      </Provider>
    </Auth0Provider>
  </StrictMode>
)
