import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'

export default function FormField({
  id,
  label,
  type = 'text',
  value,
  onChange,
  onBlur,
  placeholder,
  autoComplete,
  icon: Icon,
  error,
  hint,
  required = true,
  minLength,
  maxLength,
  inputMode,
}) {
  const [isVisible, setIsVisible] = useState(false)
  const isPassword = type === 'password'
  const inputType = isPassword && isVisible ? 'text' : type
  const descriptionId = error ? `${id}-error` : hint ? `${id}-hint` : undefined

  return (
    <div className={`field${error ? ' field--error' : ''}`}>
      <label className="field__label" htmlFor={id}>{label}</label>
      <div className="field__control">
        {Icon && <Icon className="field__icon" size={18} strokeWidth={1.8} aria-hidden="true" />}
        <input
          id={id}
          name={id}
          type={inputType}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
          minLength={minLength}
          maxLength={maxLength}
          inputMode={inputMode}
          aria-invalid={Boolean(error)}
          aria-describedby={descriptionId}
        />
        {isPassword && (
          <button
            className="password-toggle"
            type="button"
            onClick={() => setIsVisible((visible) => !visible)}
            aria-label={isVisible ? 'Hide password' : 'Show password'}
            aria-pressed={isVisible}
          >
            {isVisible ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
      {error && <p className="field__message field__message--error" id={`${id}-error`}>{error}</p>}
      {!error && hint && <p className="field__message" id={`${id}-hint`}>{hint}</p>}
    </div>
  )
}