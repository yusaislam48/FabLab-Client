import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [user, setUser] = useState({
    name: location.state?.name || 'John Doe',
    email: location.state?.email || 'john@iub.edu.bd',
    role: location.state?.role || 'iub-student',
    avatar: location.state?.avatar || null,
    memberSince: '2024',
    skillLevel: 'Intermediate'
  });

  // Mock data - In real app, this would come from API
  const [dashboardData, setDashboardData] = useState({
    stats: {
      projectsCompleted: 12,
      hoursSpent: 48,
      equipmentUsed: 8,
      skillsBadges: 5
    },
    recentProjects: [
      {
        id: 1,
        name: "3D Printed Drone Frame",
        status: "In Progress",
        progress: 75,
        image: "/api/placeholder/100/100",
        lastUpdated: "2 days ago"
      },
      {
        id: 2,
        name: "Laser Cut Phone Stand",
        status: "Completed",
        progress: 100,
        image: "/api/placeholder/100/100",
        lastUpdated: "1 week ago"
      },
      {
        id: 3,
        name: "Arduino Weather Station",
        status: "Planning",
        progress: 25,
        image: "/api/placeholder/100/100",
        lastUpdated: "3 days ago"
      }
    ],
    upcomingBookings: [
      {
        id: 1,
        type: "Workbench",
        location: "Station A3",
        date: "Today",
        time: "2:00 PM - 4:00 PM",
        equipment: ["3D Printer", "Calipers"]
      },
      {
        id: 2,
        type: "Meeting Room",
        location: "Conference Room",
        date: "Tomorrow",
        time: "10:00 AM - 12:00 PM",
        equipment: ["Projector"]
      }
    ],
    equipmentStatus: [
      { name: "3D Printer (Ender 3)", status: "available", queue: 0 },
      { name: "Laser Cutter", status: "in-use", queue: 2 },
      { name: "CNC Machine", status: "maintenance", queue: 0 },
      { name: "Soldering Station", status: "available", queue: 0 },
      { name: "Oscilloscope", status: "available", queue: 1 }
    ],
    notifications: [
      {
        id: 1,
        type: "booking",
        message: "Your workbench booking starts in 30 minutes",
        time: "30 min ago",
        unread: true
      },
      {
        id: 2,
        type: "equipment",
        message: "Laser Cutter is now available for booking",
        time: "2 hours ago",
        unread: true
      },
      {
        id: 3,
        type: "project",
        message: "John Doe liked your '3D Printed Drone Frame' project",
        time: "1 day ago",
        unread: false
      }
    ]
  });

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  const getRoleDisplayName = (role) => {
    switch (role) {
      case 'iub-student': return 'IUB Student';
      case 'faculty': return 'Faculty Member';
      case 'outside-iub': return 'External Member';
      default: return 'Member';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'text-green-400';
      case 'in-use': return 'text-yellow-400';
      case 'maintenance': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'available':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        );
      case 'in-use':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
          </svg>
        );
      case 'maintenance':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="tech-card m-4 mb-6">
        <div className="flex items-center justify-between p-6">
          <div className="flex items-center gap-4">
            <div className="relative w-12 h-12">
              {user.avatar ? (
                <img src={user.avatar} alt="Profile" className="w-full h-full rounded-full" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
              )}
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-slate-800"></div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-100">
                {getGreeting()}, {user.name.split(' ')[0]}!
              </h1>
              <p className="text-slate-400 text-sm">
                {getRoleDisplayName(user.role)} • {currentTime.toLocaleDateString()}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-400 hover:text-slate-200 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM19 3H5a2 2 0 00-2 2v10a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2z" />
              </svg>
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-400 rounded-full"></span>
            </button>
            
            <Link to="/profile" className="btn-tech-secondary px-4 py-2 text-sm">
              Profile
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="tech-card p-4 text-center">
              <div className="text-2xl font-bold text-blue-400">{dashboardData.stats.projectsCompleted}</div>
              <div className="text-slate-400 text-sm">Projects</div>
            </div>
            <div className="tech-card p-4 text-center">
              <div className="text-2xl font-bold text-green-400">{dashboardData.stats.hoursSpent}</div>
              <div className="text-slate-400 text-sm">Hours</div>
            </div>
            <div className="tech-card p-4 text-center">
              <div className="text-2xl font-bold text-purple-400">{dashboardData.stats.equipmentUsed}</div>
              <div className="text-slate-400 text-sm">Equipment</div>
            </div>
            <div className="tech-card p-4 text-center">
              <div className="text-2xl font-bold text-orange-400">{dashboardData.stats.skillsBadges}</div>
              <div className="text-slate-400 text-sm">Badges</div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="tech-card p-6">
            <h2 className="text-xl font-bold text-slate-100 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Book Space */}
              <button 
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  console.log('Book Space clicked!');
                  navigate('/booking');
                }}
                className="group p-4 rounded-xl bg-slate-800/50 hover:bg-blue-500/20 border border-slate-700/50 hover:border-blue-400/50 transition-all duration-300 cursor-pointer text-left w-full"
                style={{ zIndex: 10 }}
              >
                <div className="text-blue-400 mb-2">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="text-slate-200 font-medium">Book Space</div>
                <div className="text-slate-400 text-xs">Reserve workbench</div>
              </button>

              {/* New Project */}
              <button 
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  console.log('New Project clicked!');
                  navigate('/projects/new');
                }}
                className="group p-4 rounded-xl bg-slate-800/50 hover:bg-green-500/20 border border-slate-700/50 hover:border-green-400/50 transition-all duration-300 cursor-pointer text-left w-full"
                style={{ zIndex: 10 }}
              >
                <div className="text-green-400 mb-2">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <div className="text-slate-200 font-medium">New Project</div>
                <div className="text-slate-400 text-xs">Start creating</div>
              </button>

              {/* Borrow Kit */}
              <button 
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  console.log('Borrow Kit clicked!');
                  navigate('/borrow-kit');
                }}
                className="group p-4 rounded-xl bg-slate-800/50 hover:bg-purple-500/20 border border-slate-700/50 hover:border-purple-400/50 transition-all duration-300 cursor-pointer text-left w-full"
                style={{ zIndex: 10 }}
              >
                <div className="text-purple-400 mb-2">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <div className="text-slate-200 font-medium">Borrow Kit</div>
                <div className="text-slate-400 text-xs">Request hardware</div>
              </button>

              {/* View Projects */}
              <button 
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  console.log('View Projects clicked!');
                  navigate('/projects');
                }}
                className="group p-4 rounded-xl bg-slate-800/50 hover:bg-cyan-500/20 border border-slate-700/50 hover:border-cyan-400/50 transition-all duration-300 cursor-pointer text-left w-full"
                style={{ zIndex: 10 }}
              >
                <div className="text-cyan-400 mb-2">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <div className="text-slate-200 font-medium">View Projects</div>
                <div className="text-slate-400 text-xs">Manage all</div>
              </button>
            </div>
          </div>

          {/* Recent Projects */}
          <div className="tech-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-slate-100">Recent Projects</h2>
              <button 
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  console.log('View All clicked!');
                  navigate('/projects');
                }} 
                className="tech-link text-sm cursor-pointer hover:underline bg-transparent border-none p-0"
                style={{ zIndex: 10 }}
              >
                View All
              </button>
            </div>
            <div className="space-y-4">
              {dashboardData.recentProjects.map((project) => (
                <div key={project.id} className="flex items-center gap-4 p-4 rounded-xl bg-slate-800/30 hover:bg-slate-800/50 transition-colors">
                  <div className="w-16 h-16 bg-slate-700 rounded-lg flex items-center justify-center">
                    <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-slate-200 font-medium">{project.name}</h3>
                    <p className="text-slate-400 text-sm">Updated {project.lastUpdated}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex-1 bg-slate-700 rounded-full h-2">
                        <div 
                          className="bg-blue-400 h-2 rounded-full transition-all duration-300" 
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-slate-400 text-xs">{project.progress}%</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      project.status === 'Completed' ? 'bg-green-500/20 text-green-400' :
                      project.status === 'In Progress' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {project.status}
                    </span>
                    <button 
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        console.log(`Update project ${project.id} clicked!`);
                        navigate(`/projects/${project.id}/edit`);
                      }}
                      className="text-blue-400 hover:text-blue-300 text-xs transition-colors cursor-pointer bg-transparent border-none p-1"
                      style={{ zIndex: 10 }}
                    >
                      Update →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Bookings */}
          <div className="tech-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-slate-100">Upcoming Bookings</h2>
              <Link to="/booking" className="tech-link text-sm">Manage</Link>
            </div>
            <div className="space-y-3">
              {dashboardData.upcomingBookings.map((booking) => (
                <div key={booking.id} className="p-3 rounded-lg bg-slate-800/30 border border-slate-700/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-200 font-medium text-sm">{booking.type}</span>
                    <span className="text-blue-400 text-xs">{booking.date}</span>
                  </div>
                  <p className="text-slate-400 text-xs">{booking.location}</p>
                  <p className="text-slate-300 text-sm mt-1">{booking.time}</p>
                  {booking.equipment.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {booking.equipment.map((item, idx) => (
                        <span key={idx} className="px-2 py-0.5 bg-blue-500/20 text-blue-300 text-xs rounded">
                          {item}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Equipment Status */}
          <div className="tech-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-slate-100">Equipment Status</h2>
              <Link to="/equipment" className="tech-link text-sm">View All</Link>
            </div>
            <div className="space-y-3">
              {dashboardData.equipmentStatus.map((equipment, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={getStatusColor(equipment.status)}>
                      {getStatusIcon(equipment.status)}
                    </div>
                    <span className="text-slate-300 text-sm">{equipment.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {equipment.queue > 0 && (
                      <span className="text-orange-400 text-xs">Q:{equipment.queue}</span>
                    )}
                    <span className={`text-xs capitalize ${getStatusColor(equipment.status)}`}>
                      {equipment.status.replace('-', ' ')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notifications */}
          <div className="tech-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-slate-100">Notifications</h2>
              <span className="text-blue-400 text-xs">
                {dashboardData.notifications.filter(n => n.unread).length} new
              </span>
            </div>
            <div className="space-y-3">
              {dashboardData.notifications.slice(0, 3).map((notification) => (
                <div key={notification.id} className={`p-3 rounded-lg border ${
                  notification.unread 
                    ? 'bg-blue-500/10 border-blue-500/30' 
                    : 'bg-slate-800/30 border-slate-700/50'
                }`}>
                  <p className="text-slate-200 text-sm">{notification.message}</p>
                  <p className="text-slate-400 text-xs mt-1">{notification.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;