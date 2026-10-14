import { ArrowRight, AtSign, Check, LockKeyhole, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout'
import FormField from '../components/FormField'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { login, sessionError } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [values, setValues] = useState({ email: '', password: '', remember: true })
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  function updateField(event) {
    const { name, value, checked, type } = event.target
    setValues((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }))
    if (error) setError('')
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setIsSubmitting(true)
    try {
      await login({ email: values.email.trim(), password: values.password, remember: values.remember })
      const destination = location.state?.from?.pathname || '/dashboard'
      navigate(destination, { replace: true })
    } catch (requestError) {
      setError(requestError.message || 'We could not sign you in. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthLayout page="login">
      <div className="form-heading">
        <span className="eyebrow"><Sparkles size={14} aria-hidden="true" /> WELCOME BACK</span>
        <h2>Good to see you.</h2>
        <p>Sign in to pick up right where you left off.</p>
      </div>

      {sessionError && <div className="notice notice--warning" role="status">{sessionError}</div>}
      {error && <div className="notice notice--error" role="alert">{error}</div>}

      <form className="auth-form" onSubmit={handleSubmit}>
        <FormField
          id="email"
          label="Email address"
          type="email"
          value={values.email}
          onChange={updateField}
          placeholder="you@example.com"
          autoComplete="email"
          icon={AtSign}
        />
        <FormField
          id="password"
          label="Password"
          type="password"
          value={values.password}
          onChange={updateField}
          placeholder="Enter your password"
          autoComplete="current-password"
          icon={LockKeyhole}
        />
        <div className="form-options">
          <label className="check-label">
            <input name="remember" type="checkbox" checked={values.remember} onChange={updateField} />
            <span className="custom-check"><Check size={13} aria-hidden="true" /></span>
            <span>Remember me</span>
          </label>
        </div>

        <button className="button button--primary" type="submit" disabled={isSubmitting}>
          {isSubmitting ? <><span className="spinner spinner--light" aria-hidden="true" /> Signing in…</> : <>Sign in <ArrowRight size={17} aria-hidden="true" /></>}
        </button>
      </form>

      <p className="form-switch">New to Northstar? <Link to="/register">Create an account <ArrowRight size={14} aria-hidden="true" /></Link></p>
      <p className="form-legal">By continuing, you agree to our <span>Terms of Service</span> and <span>Privacy Policy</span>.</p>
    </AuthLayout>
  )
}