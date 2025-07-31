import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const OTPVerification = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || 'user@example.com';
  const userRole = location.state?.role || 'outside-iub';
  
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [error, setError] = useState('');
  const [resendCooldown, setResendCooldown] = useState(0);
  
  const inputRefs = useRef([]);

  // Timer countdown
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  // Resend cooldown timer
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const maskEmail = (email) => {
    const [username, domain] = email.split('@');
    if (username.length <= 2) return email;
    const maskedUsername = username[0] + '*'.repeat(username.length - 2) + username[username.length - 1];
    return `${maskedUsername}@${domain}`;
  };

  const handleChange = (index, value) => {
    // Only allow digits
    if (!/^\d*$/.test(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    
    // Handle paste
    if (e.key === 'Enter') {
      handleVerify();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    const digits = pastedData.replace(/\D/g, '').slice(0, 6);
    
    if (digits.length === 6) {
      const newOtp = digits.split('');
      setOtp(newOtp);
      inputRefs.current[5]?.focus();
    }
  };

  const handleVerify = async () => {
    const otpString = otp.join('');
    
    if (otpString.length !== 6) {
      setError('Please enter the complete 6-digit code');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For demo purposes, accept any 6-digit code
      console.log('OTP Verification:', { email, otp: otpString, role: userRole });
      
      // Redirect to dashboard after successful verification
      navigate('/dashboard', { 
        state: { 
          email: email,
          role: userRole,
          name: location.state?.name || 'User'
        } 
      });
      
    } catch (error) {
      setError('Invalid verification code. Please try again.');
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (resendCooldown > 0) return;
    
    setIsResending(true);
    setError('');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Resending OTP to:', email);
      
      // Reset timer and set cooldown
      setTimeLeft(300);
      setResendCooldown(60);
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
      
    } catch (error) {
      setError('Failed to resend code. Please try again.');
    } finally {
      setIsResending(false);
    }
  };

  const canResend = timeLeft <= 240 && resendCooldown === 0; // Can resend after 1 minute

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-72 h-72 bg-green-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
      </div>

      <div className="tech-card max-w-md w-full p-6 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-6">
          <div className="relative mx-auto w-16 h-16 mb-4">
            <div className="w-full h-full bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a4 4 0 005.66 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="absolute inset-0 bg-green-500/20 rounded-full blur-xl animate-pulse"></div>
          </div>
          
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 via-emerald-400 to-green-400 bg-clip-text text-transparent mb-2">
            Verify Your Email
          </h1>
          <p className="text-slate-400 text-sm mb-4">
            We've sent a 6-digit verification code to
          </p>
          <p className="text-blue-300 font-medium text-sm">
            {maskEmail(email)}
          </p>
          
          {/* Decorative line */}
          <div className="flex items-center justify-center mt-4 mb-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-green-400 to-transparent"></div>
            <div className="mx-3 w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-green-400 to-transparent"></div>
          </div>
        </div>

        {/* OTP Input */}
        <div className="mb-6">
          <label className="block text-slate-300 text-sm font-medium mb-4 text-center">
            Enter verification code
          </label>
          
          <div className="flex gap-3 justify-center mb-4">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={index === 0 ? handlePaste : undefined}
                className={`w-12 h-12 text-center text-xl font-bold bg-slate-800/50 border-2 rounded-xl text-slate-100 
                  focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400/20 
                  transition-all duration-300 backdrop-blur-sm
                  ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-slate-600/50'}
                  ${digit ? 'border-green-400 bg-green-500/10' : ''}
                `}
              />
            ))}
          </div>

          {error && (
            <p className="error-message text-center">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </p>
          )}
        </div>

        {/* Timer */}
        <div className="text-center mb-6">
          <p className="text-slate-400 text-sm">
            Code expires in: <span className="text-green-400 font-mono">{formatTime(timeLeft)}</span>
          </p>
        </div>

        {/* Verify Button */}
        <button
          onClick={handleVerify}
          disabled={isLoading || otp.join('').length !== 6}
          className={`btn-tech-primary group relative overflow-hidden w-full mb-4 
            ${(isLoading || otp.join('').length !== 6) ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
              <span>Verifying...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <span>Verify Email</span>
              <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          )}
          
          {/* Button glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-xl"></div>
        </button>

        {/* Resend Section */}
        <div className="text-center">
          <p className="text-slate-400 text-sm mb-3">
            Didn't receive the code?
          </p>
          
          {canResend ? (
            <button
              onClick={handleResend}
              disabled={isResending}
              className="tech-link inline-flex items-center gap-1"
            >
              {isResending ? (
                <>
                  <div className="w-3 h-3 border border-blue-400/20 border-t-blue-400 rounded-full animate-spin"></div>
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span>Resend Code</span>
                </>
              )}
            </button>
          ) : (
            <p className="text-slate-500 text-sm">
              {resendCooldown > 0 
                ? `Resend available in ${resendCooldown}s`
                : 'Resend available after 1 minute'
              }
            </p>
          )}
        </div>

        {/* Back to Registration */}
        <div className="text-center mt-6 pt-4 border-t border-slate-700/50">
          <Link to="/register" className="text-slate-400 text-sm hover:text-slate-300 transition-colors duration-200">
            ← Back to registration
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;