import { Navigate } from "react-router"

export const ProtectedRoute = ({children}) => {
    const token = sessionStorage.getItem('token')
  return token ? children : <Navigate to='/cover' />
}

export const UnavailRoute = ({children}) => {
  const token = sessionStorage.getItem('token')
  return token ? <Navigate to='/' /> : children
}