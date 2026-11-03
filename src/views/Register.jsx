import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useLogin } from '../context/LoginContext'

const Register = () => {
  const { register, isAuthenticated, isLoading, authError } = useLogin()
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
    const confirmPassword = formData.get('confirmPassword')

    if (String(password) !== String(confirmPassword)) {
      setError('Passwords do not match')
      return
    }

    setError('')
    setIsSubmitting(true)
    try {
      await register({ username: String(username), password: String(password), cpassword: String(confirmPassword) })
    } catch (submissionError) {
      setError(submissionError.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="login-shell">
      <section className="login-card">
        <p className="login-kicker">Create your account</p>
        <h1>Register</h1>

        <form className="login-form" onSubmit={handleSubmit}>
          <label>
            <span>Username</span>
            <input name="username" type="text" autoComplete="username" required />
          </label>

          <label>
            <span>Password</span>
            <input name="password" type="password" autoComplete="new-password" required />
          </label>

          <label>
            <span>Confirm password</span>
            <input name="confirmPassword" type="password" autoComplete="new-password" required />
          </label>

          {error || authError ? <p className="login-error">{error || authError}</p> : null}

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Registering...' : 'Register'}
          </button>
        </form>

        <p className="login-switch">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </section>
    </main>
  )
}

export default Register
