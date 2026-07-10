import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught:', error, info)
  }

  render() {
    if (!this.state.error) return this.props.children
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md text-center bg-white/80 dark:bg-slate-800/70 backdrop-blur-xl rounded-2xl border border-slate-100 dark:border-slate-700/60 ring-1 ring-black/5 dark:ring-white/5 shadow-sm p-8 animate-scale-in">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-500 to-rose-500 mx-auto mb-4 flex items-center justify-center shadow-lg shadow-red-500/30">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
              <path d="M12 9v4" />
              <path d="M12 17h.01" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">Something went wrong</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 mb-6">
            An unexpected error occurred. Reloading usually fixes it.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-white font-medium bg-slate-900 dark:bg-slate-100 dark:text-slate-900 hover:opacity-90 active:scale-[0.97] transition-all duration-150"
          >
            Reload app
          </button>
        </div>
      </div>
    )
  }
}

export default ErrorBoundary
