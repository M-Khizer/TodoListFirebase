import React from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'

const AuthRoute = () => {

  return !localStorage.getItem('uid') ? <Outlet/> : <Navigate to={'/todos'} />
}

export default AuthRoute