import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const isLogin = async () => {
  const temp = localStorage.getItem('dflowkey').substring(1).slice(0, -1)

  if (temp) return true

  return false
}

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isLogin() ? <Component {...props} /> : <Redirect to='/login' />
      }
    />
  )
}

export default PrivateRoute
