import { ArrowUpRight, Fingerprint, Layers3, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function AuthLayout({ children, page }) {
  return (
    <main className={`auth-shell auth-shell--${page}`}>
      <aside className="auth-aside" aria-label="About Northstar">
        <Link className="brand brand--light" to="/login" aria-label="Northstar home">
          <span className="brand-mark"><Layers3 size={19} strokeWidth={2.2} /></span>
          <span>northstar<span className="brand-period">.</span></span>
        </Link>

        <div className="aside-copy">
          <span className="eyebrow eyebrow--light">A clearer way forward</span>
          <h1>Your work,<br />in good hands.</h1>
          <p>A calmer, more considered place to manage your account and move your work forward.</p>
        </div>

        <div className="trust-card">
          <div className="trust-card__icon"><ShieldCheck size={18} /></div>
          <div>
            <strong>Thoughtfully secure</strong>
            <span>Your account is protected at every step.</span>
          </div>
          <ArrowUpRight className="trust-card__arrow" size={17} />
        </div>

        <div className="aside-visual" aria-hidden="true">
          <div className="visual-orbit visual-orbit--outer" />
          <div className="visual-orbit visual-orbit--inner" />
          <div className="visual-core"><Fingerprint size={47} strokeWidth={1.15} /></div>
          <span className="visual-dot visual-dot--one" />
          <span className="visual-dot visual-dot--two" />
          <span className="visual-caption">YOUR SPACE, YOUR PACE</span>
        </div>

        <p className="aside-footnote">A little more focus. A lot more possibility.</p>
      </aside>

      <section className="auth-main">
        <header className="mobile-brand">
          <Link className="brand" to="/login">
            <span className="brand-mark"><Layers3 size={19} strokeWidth={2.2} /></span>
            <span>northstar<span className="brand-period">.</span></span>
          </Link>
          <span className="mobile-brand__label">Your account, simplified</span>
        </header>
        <div className="auth-content">{children}</div>
        <footer className="auth-footer">
          <span>© {new Date().getFullYear()} Northstar</span>
          <span><ShieldCheck size={13} aria-hidden="true" /> Secure account access</span>
        </footer>
      </section>
    </main>
  )
}