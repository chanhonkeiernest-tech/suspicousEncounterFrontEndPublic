import { useEffect, useRef, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useLogin } from '../context/LoginContext'
//Logout operation
const Logout = () => {
  const { logout, user } = useLogin()
  const signOutStarted = useRef(false)
  const [loggedOut, setLoggedOut] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (signOutStarted.current) return
    signOutStarted.current = true

    const signOut = async () => {
      try {
        await logout()
        setLoggedOut(true)
      } catch (logoutError) {
        setError(logoutError instanceof Error ? logoutError.message : 'Logout failed')
      }
    }

    signOut()
  }, [logout])

  if (!user) return <Navigate to="/" replace />
  if (error) return <p role="alert">{error}</p>
  return <p>Signing out...</p>
}

export default Logout
