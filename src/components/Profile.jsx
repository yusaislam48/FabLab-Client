import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('personal');
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);

  // Mock profile data - in real app, this would be fetched from API
  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockProfile = {
        id: "12345",
        name: "John Doe",
        email: "john.doe@iub.edu.bd",
        studentId: "1234567",
        rfidNumber: "1234567890",
        role: "IUB Student",
        occupation: null,
        profilePicture: "/api/placeholder/150/150",
        joinDate: "2024-01-01",
        lastActive: "2024-01-21",
        status: "Active",
        projects: {
          total: 12,
          completed: 8,
          inProgress: 3,
          planning: 1
        },
        bookings: {
          total: 24,
          thisMonth: 5,
          upcoming: 2
        },
        equipment: {
          borrowed: 3,
          returned: 15,
          pending: 1
        },
        badges: [
          { name: "General Member", level: 1, achieved: true, progress: 100, icon: "user" },
          { name: "Rookie Faber", level: 2, achieved: true, progress: 100, icon: "tools" },
          { name: "Skilled Faber", level: 3, achieved: true, progress: 80, icon: "chip" },
          { name: "Expert Faber", level: 4, achieved: false, progress: 45, icon: "star" },
          { name: "Master Faber", level: 5, achieved: false, progress: 10, icon: "crown" }
        ]
      };
      
      setProfile(mockProfile);
      setLoading(false);
    };

    fetchProfile();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="tech-card p-8 text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-slate-600 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-purple-500 rounded-full animate-spin animation-delay-150 mx-auto"></div>
          </div>
          <h3 className="text-xl font-semibold text-slate-100 mb-2">Loading Profile</h3>
          <p className="text-slate-400">Fetching your account information...</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { 
      id: 'personal', 
      label: 'Personal Info', 
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    { 
      id: 'badges', 
      label: 'Badges', 
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
        </svg>
      )
    },
    { 
      id: 'security', 
      label: 'Security', 
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="tech-card m-4 mb-6">
        <div className="flex items-center justify-between p-6">
          <div className="flex items-center gap-4">
            <button 
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                navigate('/dashboard');
              }}
              className="text-slate-400 hover:text-slate-200 transition-colors bg-transparent border-none p-2 cursor-pointer"
              style={{ zIndex: 10 }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-700 border-2 border-slate-600">
                <img 
                  src={profile.profilePicture} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-100 mb-1">{profile.name}</h1>
                <p className="text-slate-400 text-sm">{profile.role} • Member since {formatDate(profile.joinDate)}</p>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-sm text-slate-400 mr-4">
              <div className={`w-2 h-2 rounded-full ${profile.status === 'Active' ? 'bg-green-400' : 'bg-red-400'}`}></div>
              <span>{profile.status}</span>
            </div>
            
            <button className="btn-tech-primary text-sm px-4 py-2 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit Profile
            </button>
          </div>
        </div>
      </header>

      <div className="mx-4 max-w-7xl mx-auto">

        {/* Navigation Tabs */}
        <div className="tech-card p-1 mb-6">
          <div className="flex space-x-1 relative">
            {/* Active tab background indicator */}
            <div 
              className="absolute top-1 bottom-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-lg transition-all duration-500 ease-in-out"
              style={{
                left: `${tabs.findIndex(tab => tab.id === activeTab) * (100 / tabs.length)}%`,
                width: `${100 / tabs.length}%`,
                transform: 'translateX(4px)',
                marginRight: '8px'
              }}
            />
            
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 relative z-10 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                  activeTab === tab.id
                    ? 'text-blue-400'
                    : 'text-slate-400 hover:text-slate-300'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="tech-card p-6 min-h-[500px]">
          <div className="animate-fade-in">
            {activeTab === 'personal' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-slate-100 mb-6">Personal Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Profile Picture Section */}
                  <div className="col-span-2 flex justify-center mb-6">
                    <div className="relative">
                      <div className="w-32 h-32 rounded-full overflow-hidden bg-slate-700 border-4 border-slate-600">
                        <img 
                          src={profile.profilePicture} 
                          alt="Profile" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <button className="absolute bottom-2 right-2 w-8 h-8 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center text-white transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Personal Details */}
                  <div>
                    <label className="block text-slate-400 text-sm mb-2">Full Name</label>
                    <div className="bg-slate-800/50 border border-slate-600/50 rounded-lg p-3 text-slate-200">
                      {profile.name}
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-400 text-sm mb-2">Email Address</label>
                    <div className="bg-slate-800/50 border border-slate-600/50 rounded-lg p-3 text-slate-200">
                      {profile.email}
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-400 text-sm mb-2">Student ID</label>
                    <div className="bg-slate-800/50 border border-slate-600/50 rounded-lg p-3 text-slate-200">
                      {profile.studentId}
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-400 text-sm mb-2">RFID Number</label>
                    <div className="bg-slate-800/50 border border-slate-600/50 rounded-lg p-3 text-slate-200">
                      {profile.rfidNumber}
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-400 text-sm mb-2">Role</label>
                    <div className="bg-slate-800/50 border border-slate-600/50 rounded-lg p-3 text-slate-200">
                      {profile.role}
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-400 text-sm mb-2">Member Since</label>
                    <div className="bg-slate-800/50 border border-slate-600/50 rounded-lg p-3 text-slate-200">
                      {formatDate(profile.joinDate)}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'badges' && (
              <div className="space-y-8">
                {/* Header Section */}
                <div className="text-center space-y-4">
                  <div className="relative">
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                      Achievement Badges
                    </h2>
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-50"></div>
                  </div>
                  <p className="text-slate-400 max-w-2xl mx-auto">
                    Track your progress and unlock new levels as you master different skills in the FabLab
                  </p>
                </div>

                {/* Badges Grid */}
                <div className="space-y-6">
                  {profile.badges.map((badge, index) => (
                    <div 
                      key={badge.name} 
                      className="group relative overflow-hidden"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      {/* Background Glow Effect */}
                      {badge.achieved && (
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl blur-xl"></div>
                      )}
                      
                      {/* Main Badge Card */}
                      <div className={`
                        relative p-6 rounded-2xl border transition-all duration-500 group-hover:scale-[1.02] 
                        ${badge.achieved 
                          ? 'bg-gradient-to-br from-slate-800/90 to-slate-900/90 border-slate-700/50 shadow-2xl shadow-purple-500/10' 
                          : 'bg-slate-800/50 border-slate-700/30 hover:border-slate-600/50'}
                      `}>
                        
                        {/* Level Indicator Line */}
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-slate-600 to-transparent"></div>
                        
                        <div className="flex items-center gap-6">
                          {/* Badge Icon with Level */}
                          <div className="relative">
                            {/* Outer Ring */}
                            <div className={`
                              w-20 h-20 rounded-full p-1 transition-all duration-500
                              ${badge.achieved 
                                ? 'bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500' 
                                : 'bg-gradient-to-br from-slate-600 to-slate-700'}
                            `}>
                              {/* Inner Icon Container */}
                              <div className="w-full h-full bg-slate-800 rounded-full flex items-center justify-center relative overflow-hidden">
                                {/* Shimmer Effect for Achieved Badges */}
                                {badge.achieved && (
                                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 animate-pulse"></div>
                                )}
                                
                                {/* Badge Icons */}
                                <div className="relative z-10">
                                  {badge.icon === 'user' && (
                                    <svg className="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                  )}
                                  {badge.icon === 'tools' && (
                                    <svg className="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                                    </svg>
                                  )}
                                  {badge.icon === 'chip' && (
                                    <svg className="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                                    </svg>
                                  )}
                                  {badge.icon === 'star' && (
                                    <svg className="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                    </svg>
                                  )}
                                  {badge.icon === 'crown' && (
                                    <svg className="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                    </svg>
                                  )}
                                </div>
                              </div>
                            </div>
                            
                            {/* Level Number Badge */}
                            <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-gradient-to-r from-orange-500 to-red-500 border-2 border-slate-800 flex items-center justify-center shadow-lg">
                              <span className="text-xs font-bold text-white">{badge.level}</span>
                            </div>
                          </div>
                          
                          {/* Badge Content */}
                          <div className="flex-1 space-y-4">
                            {/* Title and Status */}
                            <div className="flex items-center justify-between">
                              <div>
                                <h3 className={`
                                  text-xl font-bold transition-all duration-300
                                  ${badge.achieved 
                                    ? 'bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent' 
                                    : 'text-slate-200 group-hover:text-slate-100'}
                                `}>
                                  {badge.name}
                                </h3>
                                <p className="text-sm text-slate-400 mt-1">
                                  Level {badge.level} • {badge.achieved ? 'Unlocked' : 'Locked'}
                                </p>
                              </div>
                              
                              {/* Status Badge */}
                              <div className={`
                                relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                                ${badge.achieved 
                                  ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 text-green-300' 
                                  : 'bg-slate-700/50 border border-slate-600/30 text-slate-400'}
                              `}>
                                {badge.achieved && (
                                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-full animate-pulse"></div>
                                )}
                                <span className="relative flex items-center gap-2">
                                  {badge.achieved ? (
                                    <>
                                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                      </svg>
                                      Achieved
                                    </>
                                  ) : (
                                    <>
                                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                      </svg>
                                      In Progress
                                    </>
                                  )}
                                </span>
                              </div>
                            </div>
                            
                            {/* Enhanced Progress Bar */}
                            <div className="space-y-2">
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-slate-400 font-medium">Progress</span>
                                <span className={`
                                  font-bold
                                  ${badge.achieved ? 'text-green-400' : 'text-blue-400'}
                                `}>
                                  {badge.progress}%
                                </span>
                              </div>
                              
                              {/* Progress Track */}
                              <div className="relative">
                                <div className="h-3 bg-slate-700/50 rounded-full overflow-hidden backdrop-blur-sm">
                                  {/* Progress Fill */}
                                  <div 
                                    className={`
                                      h-full transition-all duration-1000 ease-out relative overflow-hidden
                                      ${badge.achieved 
                                        ? 'bg-gradient-to-r from-green-400 via-emerald-500 to-green-600' 
                                        : 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500'}
                                    `}
                                    style={{ width: `${badge.progress}%` }}
                                  >
                                    {/* Animated shine effect */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 animate-pulse"></div>
                                  </div>
                                </div>
                                
                                {/* Progress Indicator Dot */}
                                <div 
                                  className={`
                                    absolute top-1/2 transform -translate-y-1/2 w-4 h-4 rounded-full border-2 border-slate-800 transition-all duration-1000
                                    ${badge.achieved ? 'bg-green-400' : 'bg-blue-400'}
                                  `}
                                  style={{ left: `calc(${badge.progress}% - 8px)` }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Decorative Elements */}
                        <div className="absolute top-6 right-6 opacity-20">
                          <div className="w-24 h-24 border border-slate-600 rounded-full"></div>
                          <div className="absolute top-3 left-3 w-18 h-18 border border-slate-500 rounded-full"></div>
                        </div>
                      </div>
                      
                      {/* Connection Line Between Badges */}
                      {index < profile.badges.length - 1 && (
                        <div className="flex justify-center py-2">
                          <div className={`
                            w-0.5 h-6 transition-all duration-500
                            ${badge.achieved 
                              ? 'bg-gradient-to-b from-purple-500/50 to-blue-500/30' 
                              : 'bg-slate-700/30'}
                          `}></div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                {/* Achievement Summary */}
                <div className="mt-8 p-6 bg-gradient-to-r from-slate-800/50 to-slate-900/50 rounded-2xl border border-slate-700/30">
                  <div className="text-center space-y-2">
                    <h3 className="text-lg font-semibold text-slate-200">Achievement Progress</h3>
                    <div className="flex items-center justify-center gap-4 text-sm">
                      <span className="text-green-400 font-medium">
                        {profile.badges.filter(b => b.achieved).length} Achieved
                      </span>
                      <div className="w-1 h-1 bg-slate-600 rounded-full"></div>
                      <span className="text-blue-400 font-medium">
                        {profile.badges.filter(b => !b.achieved).length} In Progress
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-slate-100 mb-6">Security Settings</h2>
                
                <div className="space-y-6">
                  {/* Change Password Form */}
                  <div className="p-6 bg-slate-800/30 rounded-lg border border-slate-600/30">
                    <h3 className="text-lg font-medium text-slate-200 mb-4">Change Password</h3>
                    <p className="text-slate-400 text-sm mb-6">Your password was last updated 30 days ago</p>
                    
                    <form className="space-y-4">
                      <div>
                        <label htmlFor="current-password" className="block text-slate-400 text-sm mb-2">Current Password</label>
                        <input 
                          type="password" 
                          id="current-password"
                          className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3 text-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                          placeholder="Enter your current password"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="new-password" className="block text-slate-400 text-sm mb-2">New Password</label>
                        <input 
                          type="password" 
                          id="new-password"
                          className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3 text-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                          placeholder="Enter your new password"
                        />
                        <p className="text-xs text-slate-400 mt-2">Password must be at least 8 characters with letters, numbers, and special characters</p>
                      </div>
                      
                      <div>
                        <label htmlFor="confirm-password" className="block text-slate-400 text-sm mb-2">Confirm New Password</label>
                        <input 
                          type="password" 
                          id="confirm-password"
                          className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3 text-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                          placeholder="Confirm your new password"
                        />
                      </div>
                      
                      <div className="flex justify-end pt-4">
                        <button 
                          type="submit" 
                          className="btn-tech-primary text-sm px-6 py-2"
                        >
                          Update Password
                        </button>
                      </div>
                    </form>
                  </div>

                  {/* Two-Factor Authentication */}
                  <div className="p-6 bg-slate-800/30 rounded-lg border border-slate-600/30">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-medium text-slate-200">Two-Factor Authentication</h3>
                        <p className="text-slate-400 text-sm">Add an extra layer of security to your account</p>
                      </div>
                      <button className="btn-tech-primary text-sm px-4 py-2">
                        Enable 2FA
                      </button>
                    </div>
                  </div>

                  {/* Account Deletion */}
                  <div className="p-6 bg-red-900/20 rounded-lg border border-red-500/30">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-medium text-red-400">Delete Account</h3>
                        <p className="text-slate-400 text-sm">Permanently delete your account and all associated data</p>
                      </div>
                      <button className="bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30 px-4 py-2 rounded-lg text-sm transition-colors">
                        Delete Account
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;