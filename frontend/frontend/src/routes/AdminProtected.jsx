import { Navigate } from "react-router"

const adminToken = sessionStorage.getItem('admintoken')

export const AdminProtected = ({children}) => {
  return adminToken ? children : <Navigate to='/admin/login/' />
}

export const AdminUnAvailRoute = ({children}) => {
  return !adminToken ? children : <Navigate to='/' />
}
