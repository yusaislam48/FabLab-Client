import { Routes, Route, Navigate, Link } from 'react-router-dom'
import Login from './components/Login'
import Registration from './components/Registration'
import OTPVerification from './components/OTPVerification'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/verify-email" element={<OTPVerification />} />
        {/* Placeholder for forgot password route */}
        <Route path="/forgot-password" element={
          <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-20 left-20 w-72 h-72 bg-orange-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
              <div className="absolute bottom-20 right-20 w-72 h-72 bg-red-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
            </div>

            <div className="tech-card max-w-md w-full p-8 text-center relative z-10">
              <div className="mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent mb-3">
                  Password Recovery
                </h1>
                <p className="text-slate-400">This feature is coming soon to help you reset your password securely.</p>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 bg-slate-800/50 border border-slate-600/50 rounded-xl">
                  <p className="text-slate-300 text-sm">
                    🚧 Under Development
                  </p>
                </div>
                
                <Link to="/login" className="btn-tech-secondary group inline-flex items-center gap-2">
                  <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                  </svg>
                  <span>Back to Login</span>
                </Link>
              </div>
            </div>
          </div>
        } />
      </Routes>
    </div>
  )
}

export default App
