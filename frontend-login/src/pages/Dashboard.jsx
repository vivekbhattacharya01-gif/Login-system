import { ArrowDownRight, ArrowUpRight, Check, Clock3, Layers3, LogOut, Mail, ShieldCheck, UserRound } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function initials(name = '') {
  return name.trim().split(/\s+/).slice(0, 2).map((part) => part[0]?.toUpperCase()).join('') || 'N'
}

export default function Dashboard() {
  const { user, logout } = useAuth()
  const [isSigningOut, setIsSigningOut] = useState(false)

  function handleSignOut() {
    setIsSigningOut(true)
    logout()
  }

  const displayName = user?.name || 'there'
  const email = user?.email || 'Email not provided'
  const createdAt = user?.createdAt ? new Date(user.createdAt).toLocaleDateString(undefined, { month: 'long', year: 'numeric' }) : null

  return (
    <main className="dashboard-shell">
      <aside className="dashboard-sidebar">
        <Link className="brand brand--light" to="/dashboard">
          <span className="brand-mark"><Layers3 size={19} strokeWidth={2.2} /></span>
          <span>northstar<span className="brand-period">.</span></span>
        </Link>
        <p className="dashboard-nav-label">WORKSPACE</p>
        <div className="dashboard-nav-item dashboard-nav-item--active"><Layers3 size={17} /> Overview</div>
        <div className="dashboard-sidebar__bottom">
          <div className="sidebar-profile">
            <span className="avatar avatar--small">{initials(user?.name)}</span>
            <span className="sidebar-profile__text"><strong>{displayName}</strong><span>Personal workspace</span></span>
          </div>
          <button className="sidebar-signout" type="button" onClick={handleSignOut} disabled={isSigningOut}>
            <LogOut size={16} /> Sign out
          </button>
        </div>
      </aside>

      <section className="dashboard-main">
        <header className="dashboard-topbar">
          <span className="dashboard-breadcrumb">Workspace <span>/</span> Overview</span>
          <button className="button button--quiet" type="button" onClick={handleSignOut} disabled={isSigningOut}>
            <LogOut size={16} /> Sign out
          </button>
        </header>

        <div className="dashboard-content">
          <div className="dashboard-welcome">
            <div>
              <span className="eyebrow">YOUR WORKSPACE</span>
              <h1>Welcome, {displayName.split(' ')[0]}<span className="brand-period">.</span></h1>
              <p>Here’s a quick look at your account.</p>
            </div>
            <span className="avatar avatar--large">{initials(user?.name)}</span>
          </div>

          <div className="dashboard-grid">
            <article className="profile-card">
              <div className="card-heading">
                <div><span className="card-icon"><UserRound size={18} /></span><div><h2>Your profile</h2><p>Your account information</p></div></div>
                <ArrowUpRight className="muted-icon" size={18} aria-hidden="true" />
              </div>
              <div className="profile-identity">
                <span className="avatar avatar--medium">{initials(user?.name)}</span>
                <div><strong>{user?.name || 'Northstar member'}</strong><span>Personal account</span></div>
              </div>
              <div className="profile-detail"><span><Mail size={16} /> Email address</span><strong>{email}</strong></div>
              <div className="profile-detail"><span><Clock3 size={16} /> Member since</span><strong>{createdAt || 'Welcome aboard'}</strong></div>
            </article>

            <article className="status-card">
              <div className="card-heading">
                <div><span className="card-icon card-icon--purple"><ShieldCheck size={18} /></span><div><h2>Account status</h2><p>Everything is looking good</p></div></div>
              </div>
              <div className="status-indicator"><span className="status-indicator__check"><Check size={17} /></span><div><strong>Active and secure</strong><span>Your account is ready to go.</span></div></div>
              <div className="status-foot"><ShieldCheck size={15} /> Signed in securely <ArrowDownRight size={15} /></div>
            </article>
          </div>

          <div className="dashboard-note">
            <div className="dashboard-note__icon"><Layers3 size={18} /></div>
            <div><strong>A fresh start, built around you.</strong><p>Your workspace is ready whenever you are. More tools and updates will show up here.</p></div>
          </div>
          <p className="dashboard-copyright">A little more focus. A lot more possibility.</p>
        </div>
      </section>
    </main>
  )
}