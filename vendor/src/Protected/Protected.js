import React from 'react';
import auth from "../services/auth"
import { Redirect, Route } from 'react-router-dom'
import http from "../Helper/http"
let user = auth.getUser("user")

const ProtectedActivity = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) =>
    user&&user.category_id==1
      ? <Component {...props} />
      : <Redirect to='/dashboard' />
  } />
)
const ProtectedRental = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) =>
    user&&user.category_id==2
      ? <Component {...props} />
      : <Redirect to='/dashboard' />
  } />
)


const Protected = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) =>
    auth.getUser()
      ? <Component {...props} />
      : <Redirect to='/login' />
  } />
)
const ProtectedLogin = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) =>
    auth.getUser()
      ? <Redirect to='/dashboard' />
      : <Component {...props} />
  } />
)

export {
  ProtectedRental,
  ProtectedActivity,
  ProtectedLogin,
  Protected
} 