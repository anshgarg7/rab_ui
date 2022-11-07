import React from 'react';
import auth from "../services/auth"
import {Redirect, Route} from 'react-router-dom'

const Protected = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => 
      auth.getUser()
        ? <Component {...props} />
        : <Redirect to='/home'/>
    } />
  )
  const ProtectedLogin = ({ component:Component,...rest}) => (
    <Route {...rest} render={(props) => 
      auth.getUser()
        ? <Redirect to='/home'/>
        : <Component {...props} />
    } />
  )

export {
  ProtectedLogin,
  Protected
} 