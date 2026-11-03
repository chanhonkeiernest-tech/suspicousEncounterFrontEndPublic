import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useLogin } from '../context/LoginContext'

const Login = () => {
  const { login, isAuthenticated, isLoading, authError } = useLogin()
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (isLoading) {
    return <main className="login-shell"><p>Checking your session...</p></main>
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const username = formData.get('username')
    const password = formData.get('password')

    setError('')
    setIsSubmitting(true)
    try {
      await login({ username: String(username), password: String(password) })
    } catch (submissionError) {
      setError(submissionError.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="login-shell">
      <section className="login-card">
        <p className="login-kicker">Welcome back</p>
        <h1>Sign in</h1>

        <form className="login-form" onSubmit={handleSubmit}>
          <label>
            <span>Username</span>
            <input name="username" type="text" autoComplete="username" required />
          </label>

          <label>
            <span>Password</span>
            <input name="password" type="password" autoComplete="current-password" required />
          </label>

          {error || authError ? <p className="login-error">{error || authError}</p> : null}

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="login-switch">
          Don&apos;t have an account? <Link to="/register">Register</Link>
        </p>
      </section>
    </main>
  )
};

export default Login
