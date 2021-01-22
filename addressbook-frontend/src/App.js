import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { map } from 'rxjs/operators'
import { ajax } from 'rxjs/ajax'
import Auth from 'use-eazy-auth'
import { AuthRoute, GuestRoute } from 'use-eazy-auth/routes'
import Home from './pages/Home'
import Login from './pages/Login'

const login = (credentials = {}) =>
  ajax({
    url: '/api/token/',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: credentials,
  }).pipe(
    map((o) => ({
      accessToken: o.response.access,
      refreshToken: o.response.refresh,
    }))
  )

const me = (token) =>
  ajax.getJSON('/api/me/', {
    Authorization: `Bearer ${token}`,
  })

function App() {
  return (
    <Auth loginCall={login} meCall={me}>
      <Router>
        <Switch>
          <GuestRoute path="/login">
            <Login />
          </GuestRoute>
          <AuthRoute path="/" exact>
            <Home />
          </AuthRoute>
        </Switch>
      </Router>
    </Auth>
  )
}

export default App
