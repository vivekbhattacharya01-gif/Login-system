import { ArrowRight, AtSign, Check, LockKeyhole, Sparkles, UserRound } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout'
import FormField from '../components/FormField'
import { useAuth } from '../context/AuthContext'

export default function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [values, setValues] = useState({ name: '', email: '', password: '', confirmPassword: '' })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (!success) return undefined
    const timeout = window.setTimeout(() => navigate('/login', { replace: true, state: { message: success } }), 1800)
    return () => window.clearTimeout(timeout)
  }, [success, navigate])

  function updateField(event) {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
    if (error) setError('')
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    if (values.password.length < 8) {
      setError('Choose a password with at least 8 characters.')
      return
    }
    if (values.password !== values.confirmPassword) {
      setError('Your passwords do not match. Please check and try again.')
      return
    }

    setIsSubmitting(true)
    try {
      await register({
        name: values.name.trim(),
        email: values.email.trim(),
        password: values.password,
      })
      setSuccess('Your account is ready. Taking you to sign in…')
    } catch (requestError) {
      setError(requestError.message || 'We could not create your account. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthLayout page="register">
      <div className="form-heading">
        <span className="eyebrow"><Sparkles size={14} aria-hidden="true" /> GET STARTED</span>
        <h2>Make room for more.</h2>
        <p>Create your account. Your next chapter starts here.</p>
      </div>

      {error && <div className="notice notice--error" role="alert">{error}</div>}
      {success && <div className="notice notice--success" role="status">{success}</div>}

      <form className="auth-form" onSubmit={handleSubmit}>
        <FormField
          id="name"
          label="Full name"
          value={values.name}
          onChange={updateField}
          placeholder="Your name"
          autoComplete="name"
          icon={UserRound}
          maxLength={100}
        />
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
          label="Create password"
          type="password"
          value={values.password}
          onChange={updateField}
          placeholder="At least 8 characters"
          autoComplete="new-password"
          icon={LockKeyhole}
          minLength={8}
          hint="Use at least 8 characters."
        />
        <FormField
          id="confirmPassword"
          label="Confirm password"
          type="password"
          value={values.confirmPassword}
          onChange={updateField}
          placeholder="Enter your password again"
          autoComplete="new-password"
          icon={LockKeyhole}
          minLength={8}
        />
        <button className="button button--primary" type="submit" disabled={isSubmitting || Boolean(success)}>
          {isSubmitting ? <><span className="spinner spinner--light" aria-hidden="true" /> Creating account…</> : <>Create account <ArrowRight size={17} aria-hidden="true" /></>}
        </button>
      </form>

      <p className="form-switch">Already have an account? <Link to="/login">Sign in <ArrowRight size={14} aria-hidden="true" /></Link></p>
      <p className="form-legal"><Check size={13} aria-hidden="true" /> Your information is encrypted and kept private.</p>
    </AuthLayout>
  )
}