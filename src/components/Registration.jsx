import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Registration = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'outside-iub',
    rfidNumber: '',
    occupation: '',
    profilePicture: null
  });

  const [profilePreview, setProfilePreview] = useState(null);

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState('');

  const roleOptions = [
    { 
      value: 'iub-student', 
      label: 'IUB Student Membership',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        </svg>
      ),
      description: 'For current IUB students',
      color: 'from-blue-500 to-blue-600'
    },
    { 
      value: 'faculty', 
      label: 'Faculty Member',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      description: 'For IUB faculty members',
      color: 'from-purple-500 to-purple-600'
    },
    { 
      value: 'outside-iub', 
      label: 'External Membership',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9m0 9c-5 0-9-4-9-9s4-9 9-9" />
        </svg>
      ),
      description: 'For external collaborators',
      color: 'from-green-500 to-green-600'
    }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newFormData = { ...formData, [name]: value };

    // Handle email prefilling based on role
    if (name === 'role') {
      if (value === 'iub-student' || value === 'faculty') {
        newFormData.email = '';
        newFormData.rfidNumber = '';
        newFormData.occupation = ''; // Clear occupation for IUB members
      } else if (value === 'outside-iub') {
        newFormData.email = '';
        newFormData.rfidNumber = '';
      }
    }

    // Handle email input for IUB users
    if (name === 'email' && (formData.role === 'iub-student' || formData.role === 'faculty')) {
      if (formData.role === 'iub-student') {
        // Only allow numbers for student ID (7 digits max)
        const numericOnly = value.replace(/\D/g, '').slice(0, 7);
        newFormData.email = numericOnly;
      } else {
        // For faculty, allow letters and numbers
        const cleanId = value.replace(/[^a-zA-Z0-9]/g, '');
        newFormData.email = cleanId;
      }
    }

    // Handle RFID number input for IUB users
    if (name === 'rfidNumber' && (formData.role === 'iub-student' || formData.role === 'faculty')) {
      // Only allow numbers, maximum 10 digits
      const numericOnly = value.replace(/\D/g, '').slice(0, 10);
      newFormData.rfidNumber = numericOnly;
    }

    setFormData(newFormData);
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({ ...prev, profilePicture: 'Please select an image file' }));
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, profilePicture: 'Image size must be less than 5MB' }));
        return;
      }
      
      setFormData(prev => ({ ...prev, profilePicture: file }));
      
      // Create preview URL
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfilePreview(event.target.result);
      };
      reader.readAsDataURL(file);
      
      // Clear any existing errors
      if (errors.profilePicture) {
        setErrors(prev => ({ ...prev, profilePicture: '' }));
      }
    }
  };

  const removeProfilePicture = () => {
    setFormData(prev => ({ ...prev, profilePicture: null }));
    setProfilePreview(null);
    if (errors.profilePicture) {
      setErrors(prev => ({ ...prev, profilePicture: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    // Profile picture validation - now mandatory
    if (!formData.profilePicture) {
      newErrors.profilePicture = 'Profile picture is required';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (formData.role === 'outside-iub') {
      if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
    } else if (formData.role === 'iub-student') {
      if (!/^\d{7}$/.test(formData.email)) {
        newErrors.email = 'Student ID must be exactly 7 digits';
      }
    } else if (formData.role === 'faculty') {
      if (!/^[a-zA-Z0-9]+$/.test(formData.email)) {
        newErrors.email = 'Please enter a valid faculty ID';
      }
    }

    // RFID Number validation for IUB members
    if (formData.role === 'iub-student' || formData.role === 'faculty') {
      if (!formData.rfidNumber) {
        newErrors.rfidNumber = 'RFID Number is required';
      } else if (!/^\d{10}$/.test(formData.rfidNumber)) {
        newErrors.rfidNumber = 'RFID Number must be exactly 10 digits';
      }
    }

    // Occupation validation for external members
    if (formData.role === 'outside-iub') {
      if (!formData.occupation.trim()) {
        newErrors.occupation = 'Occupation is required for external members';
      }
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      
      try {
        // Create the final form data with full email
        const finalFormData = {
          ...formData,
          email: getFullEmail()
        };
        
        // Simulate API call for registration
        await new Promise(resolve => setTimeout(resolve, 2000));
        console.log('Registration attempt:', finalFormData);
        
        // Navigate to OTP verification page
        navigate('/verify-email', {
          state: {
            email: finalFormData.email,
            role: formData.role,
            name: formData.name
          }
        });
        
      } catch (error) {
        setErrors({ submit: 'Registration failed. Please try again.' });
      } finally {
        setIsLoading(false);
      }
    } else {
      setErrors(newErrors);
    }
  };

  const getEmailPlaceholder = () => {
    if (formData.role === 'iub-student') {
      return 'Enter your 7-digit student ID';
    } else if (formData.role === 'faculty') {
      return 'Enter your faculty ID';
    } else {
      return 'Enter your email address';
    }
  };

  const getFullEmail = () => {
    if ((formData.role === 'iub-student' || formData.role === 'faculty') && formData.email) {
      return formData.email + '@iub.edu.bd';
    }
    return formData.email;
  };

  const getPasswordStrength = () => {
    const password = formData.password;
    if (!password) return { level: 0, text: '', color: '' };
    
    let score = 0;
    if (password.length >= 8) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^a-zA-Z\d]/.test(password)) score++;
    
    const levels = [
      { level: 0, text: '', color: '' },
      { level: 1, text: 'Very Weak', color: 'bg-red-500' },
      { level: 2, text: 'Weak', color: 'bg-orange-500' },
      { level: 3, text: 'Fair', color: 'bg-yellow-500' },
      { level: 4, text: 'Good', color: 'bg-blue-500' },
      { level: 5, text: 'Strong', color: 'bg-green-500' }
    ];
    
    return levels[Math.min(score, 5)];
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 right-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
      </div>

      <div className="tech-card max-w-6xl w-full relative z-10">
        <div className="grid lg:grid-cols-[2fr,3fr] gap-0 min-h-[600px] max-lg:grid-cols-1">
          {/* Left Column - Membership Type Selection */}
          <div className="lg:border-r lg:border-slate-600/50 lg:pr-6 p-6 max-lg:border-b max-lg:border-slate-600/50 max-lg:pb-6">
            {/* Header Section */}
            <div className="text-center mb-6">
              <div className="relative mx-auto w-16 h-16 mb-4">
                <img 
                  src="/fab-logo-1.png" 
                  alt="Fab Lab Logo" 
                  className="w-full h-full object-contain drop-shadow-lg"
                />
                <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-xl animate-pulse"></div>
              </div>
              
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                Join Fab Lab
              </h1>
              <p className="text-slate-400 text-sm">Start your digital fabrication journey</p>
              
              {/* Decorative line */}
              <div className="flex items-center justify-center mt-4 mb-6">
                <div className="h-px w-16 bg-gradient-to-r from-transparent via-purple-400 to-transparent"></div>
                <div className="mx-3 w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse"></div>
                <div className="h-px w-16 bg-gradient-to-r from-transparent via-purple-400 to-transparent"></div>
              </div>
            </div>

            {/* Membership Type Selection */}
            <div>
              <h2 className="text-lg font-semibold text-slate-200 mb-3">Choose Your Membership</h2>
              <p className="text-slate-400 text-sm mb-4">Select the membership type that best describes you</p>
              
              <div className="space-y-3">
                {roleOptions.map((option) => (
                  <label
                    key={option.value}
                    className="relative cursor-pointer group block transition-all duration-300 hover:transform hover:scale-[1.01]"
                  >
                    <input
                      type="radio"
                      name="role"
                      value={option.value}
                      checked={formData.role === option.value}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div className={`relative p-4 rounded-lg border transition-all duration-300 min-h-[80px] flex items-center ${
                      formData.role === option.value
                        ? `bg-gradient-to-r ${option.color} border-transparent text-white shadow-lg`
                        : 'bg-slate-800/40 border-slate-600/50 hover:border-slate-500/50 hover:bg-slate-800/60 text-slate-300'
                    }`}>
                      <div className="flex items-center gap-3 w-full">
                        <div className={`p-2.5 rounded-lg flex-shrink-0 ${
                          formData.role === option.value
                            ? 'bg-white/20'
                            : 'bg-slate-700/50'
                        }`}>
                          {option.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className={`font-semibold text-sm mb-1 ${
                            formData.role === option.value ? 'text-white' : 'text-slate-200'
                          }`}>
                            {option.label}
                          </div>
                          <div className={`text-xs leading-relaxed ${
                            formData.role === option.value ? 'text-white/80' : 'text-slate-400'
                          }`}>
                            {option.description}
                          </div>
                        </div>
                        <div className="flex-shrink-0">
                          {formData.role === option.value ? (
                            <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                              <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                          ) : (
                            <div className="w-5 h-5 border-2 border-slate-500/50 rounded-full"></div>
                          )}
                        </div>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Registration Form */}
          <div className="p-6 max-lg:pt-6">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-slate-200 mb-2">Account Details</h2>
              <p className="text-slate-400 text-sm">Fill in your information to create your account</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Profile Picture Upload - Mandatory */}
              <div className="relative">
            <label className="block text-slate-300 text-sm font-medium mb-3 text-center">
              Profile Picture <span className="text-red-400">*</span>
            </label>
            
            <div className="flex flex-col items-center gap-4">
              {/* Profile Preview */}
              <div className="relative">
                <div className="w-28 h-28 rounded-full bg-slate-800/50 border-2 border-slate-600/50 flex items-center justify-center overflow-hidden">
                  {profilePreview ? (
                    <img 
                      src={profilePreview} 
                      alt="Profile preview" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  )}
                </div>
                
                {profilePreview && (
                  <button
                    type="button"
                    onClick={removeProfilePicture}
                    className="absolute -top-1 -right-1 w-7 h-7 bg-red-500 rounded-full flex items-center justify-center text-white hover:bg-red-600 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
              
              {/* Upload Button */}
              <div className="text-center">
                <input
                  type="file"
                  id="profilePicture"
                  accept="image/*"
                  onChange={handleProfilePictureChange}
                  className="hidden"
                  required
                />
                <label
                  htmlFor="profilePicture"
                  className="cursor-pointer inline-flex items-center gap-2 px-5 py-2.5 bg-slate-800/50 border border-slate-600/50 rounded-lg text-slate-300 hover:bg-slate-700/50 hover:border-slate-500/50 transition-all duration-200 text-sm font-medium"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <span>{profilePreview ? 'Change Photo' : 'Upload Photo'}</span>
                </label>
                <p className="text-slate-400 text-xs mt-2">
                  Supports JPG, PNG. Max 5MB
                </p>
              </div>
            </div>
            
            {errors.profilePicture && (
              <p className="error-message">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {errors.profilePicture}
              </p>
            )}
          </div>

          {/* Name Field */}
          <div className="relative">
            <div className="relative">
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onFocus={() => setFocusedField('name')}
                onBlur={() => setFocusedField('')}
                className={`input-tech ${errors.name ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}`}
                placeholder="Enter your full name"
              />
              <div className="absolute left-3 top-3.5 w-5 h-5 text-slate-400">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
            {errors.name && (
              <p className="error-message">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {errors.name}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div className="relative">
            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField('')}
                className={`input-tech ${(formData.role === 'iub-student' || formData.role === 'faculty') ? 'with-domain' : ''} ${errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}`}
                placeholder={getEmailPlaceholder()}
              />
              <div className="absolute left-3 top-3.5 w-5 h-5 text-slate-400">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </div>
              {(formData.role === 'iub-student' || formData.role === 'faculty') && (
                <div className="absolute right-3 top-3.5 text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded">
                  @iub.edu.bd
                </div>
              )}
            </div>
            {errors.email && (
              <p className="error-message">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {errors.email}
              </p>
            )}
            {(formData.role === 'iub-student' || formData.role === 'faculty') && (
              <p className="text-slate-400 text-xs mt-1">
                {formData.role === 'iub-student' 
                  ? 'Enter your 7-digit student ID number' 
                  : 'Enter your faculty ID'
                }
              </p>
            )}
          </div>

          {/* Occupation Field - Only for External Members */}
          {formData.role === 'outside-iub' && (
            <div className="relative">
              <div className="relative">
                <input
                  type="text"
                  id="occupation"
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('occupation')}
                  onBlur={() => setFocusedField('')}
                  className={`input-tech ${errors.occupation ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}`}
                  placeholder="Enter your occupation/profession"
                />
                <div className="absolute left-3 top-3.5 w-5 h-5 text-slate-400">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m8 0H8m8 0v2a2 2 0 002 2h2a2 2 0 002-2V8a2 2 0 00-2-2h-2z" />
                  </svg>
                </div>
                {focusedField === 'occupation' && (
                  <div className="absolute right-3 top-3.5 w-5 h-5 text-blue-400 animate-pulse">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                )}
              </div>
              {errors.occupation && (
                <p className="error-message">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {errors.occupation}
                </p>
              )}
              <p className="text-slate-400 text-xs mt-1 flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                e.g., Software Engineer, Student, Researcher, Designer
              </p>
            </div>
          )}

          {/* RFID Number Field - Only for IUB Students and Faculty */}
          {(formData.role === 'iub-student' || formData.role === 'faculty') && (
            <div className="relative">
              <div className="relative">
                <input
                  type="text"
                  id="rfidNumber"
                  name="rfidNumber"
                  value={formData.rfidNumber}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('rfidNumber')}
                  onBlur={() => setFocusedField('')}
                  className={`input-tech ${errors.rfidNumber ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}`}
                  placeholder="Enter your 10-digit RFID number"
                  maxLength="10"
                />
                <div className="absolute left-3 top-3.5 w-5 h-5 text-slate-400">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                {focusedField === 'rfidNumber' && (
                  <div className="absolute right-3 top-3.5 w-5 h-5 text-blue-400 animate-pulse">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                )}
              </div>
              {errors.rfidNumber && (
                <p className="error-message">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {errors.rfidNumber}
                </p>
              )}
              <p className="text-slate-400 text-xs mt-1 flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Found on the back side of your ID card (e.g., 0000067897)
              </p>
            </div>
          )}

          {/* Password Field */}
          <div className="relative">
            <div className="relative">
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                onFocus={() => setFocusedField('password')}
                onBlur={() => setFocusedField('')}
                className={`input-tech ${errors.password ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}`}
                placeholder="Create a secure password"
              />
              <div className="absolute left-3 top-3.5 w-5 h-5 text-slate-400">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
            </div>
            
            {/* Password Strength Indicator */}
            {formData.password && (
              <div className="mt-1">
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-slate-700 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-300 ${getPasswordStrength().color}`}
                      style={{ width: `${(getPasswordStrength().level / 5) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-slate-400">{getPasswordStrength().text}</span>
                </div>
              </div>
            )}
            
            {errors.password && (
              <p className="error-message">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {errors.password}
              </p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="relative">
            <div className="relative">
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                onFocus={() => setFocusedField('confirmPassword')}
                onBlur={() => setFocusedField('')}
                className={`input-tech ${errors.confirmPassword ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}`}
                placeholder="Confirm your password"
              />
              <div className="absolute left-3 top-3.5 w-5 h-5 text-slate-400">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              {formData.confirmPassword && formData.password === formData.confirmPassword && (
                <div className="absolute right-3 top-3.5 w-5 h-5 text-green-400">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </div>
            {errors.confirmPassword && (
              <p className="error-message">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="btn-tech-primary group relative overflow-hidden"
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                <span>Creating account...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <span>Create Account</span>
                <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
            )}
            
            {/* Button glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-xl"></div>
              </button>
              
              {/* Login Link */}
              <div className="text-center mt-6">
                <p className="text-slate-400 text-sm mb-3">
                  Already a member?{' '}
                  <Link to="/login" className="tech-link">
                    Sign in here
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;