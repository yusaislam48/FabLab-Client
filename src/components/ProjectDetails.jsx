import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  // Mock project data - in real app, this would be fetched from API
  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockProject = {
        id: parseInt(id),
        name: "3D Printed Drone Frame",
        description: "Designing and printing a lightweight drone frame using PLA material for racing and aerial photography. This project combines advanced 3D modeling techniques with practical engineering considerations for optimal aerodynamics and durability.",
        category: "3D Printing",
        status: "In Progress",
        progress: 75,
        tags: ["3D Printing", "Drone", "Engineering", "Racing", "Aerodynamics"],
        createdDate: "2024-01-15",
        lastUpdated: "2024-01-20",
        estimatedCompletion: "2024-01-25",
        materials: [
          "PLA Filament (Black, 500g)",
          "M3 x 10mm Screws (20pcs)",
          "M3 x 16mm Screws (8pcs)",
          "Carbon Fiber Rods (4mm diameter)",
          "TPU Filament (for shock mounts)",
          "Heat Shrink Tubing"
        ],
        equipment: [
          "Ender 3 Pro 3D Printer",
          "Digital Calipers",
          "Screwdriver Set",
          "Drill with 3mm bit",
          "Heat Gun",
          "Fusion 360 (CAD Software)"
        ],
        collaborators: [
          { email: "john.doe@iub.edu.bd", role: "Project Owner", avatar: "JD", status: "active" },
          { email: "sarah.smith@iub.edu.bd", role: "Hardware Specialist", avatar: "SS", status: "active" },
          { email: "mike.chen@iub.edu.bd", role: "Design Consultant", avatar: "MC", status: "inactive" }
        ],
        images: [
          { id: 1, url: "/api/placeholder/400/300", caption: "Initial 3D Model Design", type: "design" },
          { id: 2, url: "/api/placeholder/400/300", caption: "First Prototype Print", type: "prototype" },
          { id: 3, url: "/api/placeholder/400/300", caption: "Assembled Frame with Motors", type: "assembly" },
          { id: 4, url: "/api/placeholder/400/300", caption: "Flight Test Results", type: "testing" }
        ],
        updates: [
          {
            id: 1,
            date: "2024-01-20",
            author: "John Doe",
            title: "Motor Mount Reinforcement",
            description: "Added additional support structures to motor mounts after vibration testing revealed stress points.",
            progress: 75,
            tasks: ["Redesigned motor mount geometry", "Added vibration dampening features", "Printed and tested new design"],
            images: ["/api/placeholder/300/200"]
          },
          {
            id: 2,
            date: "2024-01-18",
            author: "Sarah Smith",
            title: "Initial Prototype Testing",
            description: "Completed first flight test of the basic frame structure. Overall performance exceeded expectations.",
            progress: 65,
            tasks: ["Assembled frame with basic components", "Conducted hover tests", "Analyzed stress points"],
            images: ["/api/placeholder/300/200", "/api/placeholder/300/200"]
          },
          {
            id: 3,
            date: "2024-01-16",
            author: "John Doe",
            title: "3D Printing Complete",
            description: "All main frame components have been successfully printed with excellent quality and accuracy.",
            progress: 50,
            tasks: ["Printed main body sections", "Printed motor mounts", "Quality checked all parts"],
            images: ["/api/placeholder/300/200"]
          }
        ],
        specifications: {
          "Frame Material": "PLA Plastic",
          "Weight": "185g (estimated)",
          "Dimensions": "250mm x 250mm x 80mm",
          "Motor Mount": "16mm diameter",
          "Propeller Size": "5 inch compatible",
          "Battery": "3S LiPo compatible",
          "Print Time": "12 hours total",
          "Infill Density": "25%"
        },
        isPublic: true,
        difficulty: "Intermediate",
        likes: 23,
        views: 156,
        forks: 7
      };
      
      setProject(mockProject);
      setLoading(false);
    };

    fetchProject();
  }, [id]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'In Progress': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Planning': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'On Hold': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-400';
      case 'Intermediate': return 'text-yellow-400';
      case 'Advanced': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'from-green-500 to-emerald-500';
    if (progress >= 50) return 'from-blue-500 to-cyan-500';
    if (progress >= 25) return 'from-yellow-500 to-orange-500';
    return 'from-red-500 to-pink-500';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="tech-card p-8 text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-slate-600 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-purple-500 rounded-full animate-spin animation-delay-150 mx-auto"></div>
          </div>
          <h3 className="text-xl font-semibold text-slate-100 mb-2">Loading Project Details</h3>
          <p className="text-slate-400">Fetching comprehensive project information...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="tech-card p-8 text-center">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-slate-100 mb-2">Project Not Found</h3>
          <p className="text-slate-400 mb-6">The project you're looking for doesn't exist or has been removed.</p>
          <Link to="/projects" className="btn-tech-primary px-6 py-2">
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  const tabs = [
    { 
      id: 'overview', 
      label: 'Overview', 
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    { 
      id: 'updates', 
      label: 'Updates', 
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      )
    },
    { 
      id: 'gallery', 
      label: 'Gallery', 
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    { 
      id: 'team', 
      label: 'Team', 
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    { 
      id: 'specs', 
      label: 'Specs', 
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
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
                navigate('/projects');
              }}
              className="text-slate-400 hover:text-slate-200 transition-colors bg-transparent border-none p-2 cursor-pointer"
              style={{ zIndex: 10 }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-slate-100 mb-1">{project.name}</h1>
              <p className="text-slate-400 text-sm">{project.category} • Created {formatDate(project.createdDate)}</p>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-4 text-sm text-slate-400 mr-4">
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span>{project.likes}</span>
              </div>
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span>{project.views}</span>
              </div>
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
                <span>{project.forks}</span>
              </div>
            </div>
            
            <button className="btn-tech-secondary text-sm px-4 py-2 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
              </svg>
              Fork
            </button>
            
            <Link 
              to={`/projects/${project.id}/edit`} 
              className="btn-tech-primary text-sm px-4 py-2 flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit Project
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-4 max-w-7xl mx-auto">
        {/* Project Status Bar */}
        <div className="tech-card p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Status */}
            <div>
              <label className="block text-slate-400 text-sm mb-2">Status</label>
              <span className={`inline-flex px-3 py-1 text-sm rounded-full border ${getStatusColor(project.status)}`}>
                {project.status}
              </span>
            </div>

            {/* Progress */}
            <div>
              <label className="block text-slate-400 text-sm mb-2">Progress</label>
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-slate-700 rounded-full h-3">
                  <div 
                    className={`bg-gradient-to-r ${getProgressColor(project.progress)} h-3 rounded-full transition-all duration-500`}
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
                <span className="text-slate-200 text-sm font-medium">{project.progress}%</span>
              </div>
            </div>

            {/* Difficulty */}
            <div>
              <label className="block text-slate-400 text-sm mb-2">Difficulty</label>
              <span className={`text-sm font-medium ${getDifficultyColor(project.difficulty)}`}>
                {project.difficulty}
              </span>
            </div>

            {/* Completion Date */}
            <div>
              <label className="block text-slate-400 text-sm mb-2">Est. Completion</label>
              <span className="text-slate-200 text-sm">
                {new Date(project.estimatedCompletion).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

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
                right: '4px'
              }}
            />
            
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-300 relative z-10 group ${
                  activeTab === tab.id
                    ? 'text-blue-400'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/30'
                }`}
              >
                <span className={`transition-all duration-300 ${
                  activeTab === tab.id 
                    ? 'scale-110 drop-shadow-lg' 
                    : 'group-hover:scale-105'
                }`}>
                  {tab.icon}
                </span>
                <span className={`transition-all duration-300 ${
                  activeTab === tab.id 
                    ? 'font-semibold' 
                    : 'group-hover:font-medium'
                }`}>
                  {tab.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="animate-fade-in">
                {/* Description */}
                <div className="tech-card p-6">
                  <h2 className="text-xl font-bold text-slate-100 mb-4">Project Description</h2>
                  <p className="text-slate-300 leading-relaxed">{project.description}</p>
                  
                  {/* Tags */}
                  <div className="mt-6">
                    <h3 className="text-sm font-medium text-slate-400 mb-3">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, idx) => (
                        <span key={idx} className="px-3 py-1 bg-slate-700/50 text-slate-300 text-sm rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Materials & Equipment */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Materials */}
                  <div className="tech-card p-6">
                    <h3 className="text-lg font-bold text-slate-100 mb-4 flex items-center gap-2">
                      <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                      Materials
                    </h3>
                    <div className="space-y-3">
                      {project.materials.map((material, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg">
                          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                          <span className="text-slate-300 text-sm">{material}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Equipment */}
                  <div className="tech-card p-6">
                    <h3 className="text-lg font-bold text-slate-100 mb-4 flex items-center gap-2">
                      <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Equipment
                    </h3>
                    <div className="space-y-3">
                      {project.equipment.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg">
                          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                          <span className="text-slate-300 text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Updates Tab */}
            {activeTab === 'updates' && (
              <div className="animate-fade-in space-y-6">
                {project.updates.map((update) => (
                  <div key={update.id} className="tech-card p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-slate-100 mb-1">{update.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-slate-400">
                          <span>{update.author}</span>
                          <span>•</span>
                          <span>{formatDate(update.date)}</span>
                          <span>•</span>
                          <span className="text-blue-400">{update.progress}% complete</span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-slate-300 mb-4">{update.description}</p>
                    
                    {/* Tasks */}
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-slate-400 mb-2">Completed Tasks:</h4>
                      <div className="space-y-2">
                        {update.tasks.map((task, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-slate-300 text-sm">{task}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Update Images */}
                    {update.images && update.images.length > 0 && (
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {update.images.map((image, idx) => (
                          <div key={idx} className="aspect-video bg-slate-700 rounded-lg flex items-center justify-center">
                            <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Gallery Tab */}
            {activeTab === 'gallery' && (
              <div className="animate-fade-in">
                <div className="tech-card p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {project.images.map((image) => (
                    <div key={image.id} className="group">
                      <div className="aspect-video bg-slate-700 rounded-lg mb-3 flex items-center justify-center group-hover:bg-slate-600 transition-colors">
                        <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <h4 className="text-slate-200 font-medium mb-1">{image.caption}</h4>
                      <span className="text-xs text-slate-400 capitalize">{image.type}</span>
                    </div>
                  ))}
                </div>
                </div>
              </div>
            )}

            {/* Team Tab */}
            {activeTab === 'team' && (
              <div className="animate-fade-in">
                <div className="tech-card p-6">
                <h2 className="text-xl font-bold text-slate-100 mb-6">Project Team</h2>
                <div className="space-y-4">
                  {project.collaborators.map((collaborator, idx) => (
                    <div key={idx} className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-lg">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${
                        collaborator.status === 'active' ? 'bg-gradient-to-br from-blue-500 to-purple-500' : 'bg-slate-600'
                      }`}>
                        {collaborator.avatar}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-slate-200 font-medium">{collaborator.email}</h4>
                        <p className="text-slate-400 text-sm">{collaborator.role}</p>
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs ${
                        collaborator.status === 'active' 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-slate-600/50 text-slate-400'
                      }`}>
                        {collaborator.status}
                      </div>
                    </div>
                  ))}
                </div>
                </div>
              </div>
            )}

            {/* Specs Tab */}
            {activeTab === 'specs' && (
              <div className="animate-fade-in">
                <div className="tech-card p-6">
                <h2 className="text-xl font-bold text-slate-100 mb-6">Technical Specifications</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(project.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg">
                      <span className="text-slate-400 text-sm">{key}</span>
                      <span className="text-slate-200 text-sm font-medium">{value}</span>
                    </div>
                  ))}
                </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="tech-card p-6">
              <h3 className="text-lg font-bold text-slate-100 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full btn-tech-secondary text-sm py-2 flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  Add to Favorites
                </button>
                <button className="w-full btn-tech-secondary text-sm py-2 flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                  Share Project
                </button>
                <button className="w-full btn-tech-secondary text-sm py-2 flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download Files
                </button>
              </div>
            </div>

            {/* Project Stats */}
            <div className="tech-card p-6">
              <h3 className="text-lg font-bold text-slate-100 mb-4">Project Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-sm">Views</span>
                  <span className="text-slate-200 font-medium">{project.views}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-sm">Likes</span>
                  <span className="text-slate-200 font-medium">{project.likes}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-sm">Forks</span>
                  <span className="text-slate-200 font-medium">{project.forks}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-sm">Last Updated</span>
                  <span className="text-slate-200 font-medium">
                    {new Date(project.lastUpdated).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Related Projects */}
            <div className="tech-card p-6">
              <h3 className="text-lg font-bold text-slate-100 mb-4">Related Projects</h3>
              <div className="space-y-3">
                {[
                  { name: "Racing Drone Controller", category: "Electronics" },
                  { name: "3D Printed Gimbal", category: "3D Printing" },
                  { name: "FPV Camera Mount", category: "3D Printing" }
                ].map((related, idx) => (
                  <div key={idx} className="p-3 bg-slate-800/50 rounded-lg hover:bg-slate-700/50 transition-colors cursor-pointer">
                    <h4 className="text-slate-200 text-sm font-medium">{related.name}</h4>
                    <p className="text-slate-400 text-xs">{related.category}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;