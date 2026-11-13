import { useEffect, useRef, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useLogin } from '../context/LoginContext'

const Logout = () => {
  const { logout, isAuthenticated } = useLogin()
  
  const [loggedOut, setLoggedOut] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const signOut = async () => {
      await logout()

      if (!isAuthenticated) setLoggedOut(true)
      else {
        setError("logout failed")
      }
    }

    signOut()
  }, [])

  if (loggedOut) return <Navigate to="/" replace />
  if (error) return <p role="alert">{error}</p>
  return <p>Signing out...</p>
}

export default Logout
