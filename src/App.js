import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import Profile from './pages/Profile'
import Activate from './pages/Activate'
import PrivateRoute from './auth/verify'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path='/landing' component={Landing} />
        <Route path='/register' component={Register} />
        <Route path='/login' component={Login} />
        <Route path='/reset-password' component={ResetPassword} />
        <Route path='/forgot-password' component={ForgotPassword} />
        <PrivateRoute path='/profile' component={Profile} />
        <Route path='/active' component={Activate} />
        <Route path='/' exact>
          <Redirect to='/landing' />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
