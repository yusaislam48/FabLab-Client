import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Projects = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "3D Printed Drone Frame",
      description: "Designing and printing a lightweight drone frame using PLA material",
      category: "3D Printing",
      status: "In Progress",
      progress: 75,
      tags: ["3D Printing", "Drone", "Engineering"],
      createdDate: "2024-01-15",
      lastUpdated: "2024-01-20",
      estimatedCompletion: "2024-01-25",
      materials: ["PLA Filament", "M3 Screws", "Carbon Fiber Rods"],
      equipment: ["Ender 3 Pro", "Calipers", "Screwdriver Set"],
      images: [],
      collaborators: ["John Doe"],
      isPublic: true,
      difficulty: "Intermediate"
    },
    {
      id: 2,
      name: "Laser Cut Phone Stand",
      description: "Minimalist phone stand design cut from 3mm plywood",
      category: "Laser Cutting",
      status: "Completed",
      progress: 100,
      tags: ["Laser Cutting", "Wood", "Design"],
      createdDate: "2024-01-10",
      lastUpdated: "2024-01-18",
      estimatedCompletion: "2024-01-18",
      materials: ["3mm Plywood", "Wood Glue"],
      equipment: ["Laser Cutter", "Sandpaper"],
      images: [],
      collaborators: ["John Doe"],
      isPublic: true,
      difficulty: "Beginner"
    },
    {
      id: 3,
      name: "Arduino Weather Station",
      description: "IoT weather monitoring system with temperature, humidity, and pressure sensors",
      category: "Electronics",
      status: "Planning",
      progress: 25,
      tags: ["Arduino", "IoT", "Sensors"],
      createdDate: "2024-01-22",
      lastUpdated: "2024-01-23",
      estimatedCompletion: "2024-02-15",
      materials: ["Arduino Uno", "DHT22 Sensor", "BMP280", "LCD Display"],
      equipment: ["Soldering Station", "Breadboard", "Multimeter"],
      images: [],
      collaborators: ["John Doe", "Jane Smith"],
      isPublic: false,
      difficulty: "Advanced"
    }
  ]);

  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterCategory, setFilterCategory] = useState('All');
  const [sortBy, setSortBy] = useState('lastUpdated');

  const categories = ['All', '3D Printing', 'Laser Cutting', 'Electronics', 'CNC', 'Woodworking', 'Textiles'];
  const statuses = ['All', 'Planning', 'In Progress', 'Completed', 'On Hold'];

  useEffect(() => {
    let filtered = projects;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(project =>
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Status filter
    if (filterStatus !== 'All') {
      filtered = filtered.filter(project => project.status === filterStatus);
    }

    // Category filter
    if (filterCategory !== 'All') {
      filtered = filtered.filter(project => project.category === filterCategory);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'progress':
          return b.progress - a.progress;
        case 'createdDate':
          return new Date(b.createdDate) - new Date(a.createdDate);
        case 'lastUpdated':
        default:
          return new Date(b.lastUpdated) - new Date(a.lastUpdated);
      }
    });

    setFilteredProjects(filtered);
  }, [projects, searchTerm, filterStatus, filterCategory, sortBy]);

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
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="tech-card m-4 mb-6">
        <div className="flex items-center justify-between p-6">
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="text-slate-400 hover:text-slate-200 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-slate-100">Projects</h1>
              <p className="text-slate-400">Manage your fab lab projects and track progress</p>
            </div>
          </div>
          
          <Link to="/projects/new" className="btn-tech-primary px-6 py-2">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span>New Project</span>
            </div>
          </Link>
        </div>
      </header>

      <div className="mx-4 space-y-6">
        {/* Filters and Search */}
        <div className="tech-card p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-tech"
              />
              <div className="absolute left-3 top-3.5 w-5 h-5 text-slate-400">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Status Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="tech-select"
            >
              {statuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>

            {/* Category Filter */}
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="tech-select"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="tech-select"
            >
              <option value="lastUpdated">Last Updated</option>
              <option value="name">Name</option>
              <option value="progress">Progress</option>
              <option value="createdDate">Created Date</option>
            </select>
          </div>
        </div>

        {/* Project Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="tech-card p-4 text-center">
            <div className="text-2xl font-bold text-blue-400">{projects.length}</div>
            <div className="text-slate-400 text-sm">Total Projects</div>
          </div>
          <div className="tech-card p-4 text-center">
            <div className="text-2xl font-bold text-green-400">
              {projects.filter(p => p.status === 'Completed').length}
            </div>
            <div className="text-slate-400 text-sm">Completed</div>
          </div>
          <div className="tech-card p-4 text-center">
            <div className="text-2xl font-bold text-yellow-400">
              {projects.filter(p => p.status === 'In Progress').length}
            </div>
            <div className="text-slate-400 text-sm">In Progress</div>
          </div>
          <div className="tech-card p-4 text-center">
            <div className="text-2xl font-bold text-purple-400">
              {Math.round(projects.reduce((acc, p) => acc + p.progress, 0) / projects.length)}%
            </div>
            <div className="text-slate-400 text-sm">Avg Progress</div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div key={project.id} className="tech-card p-6 group hover:scale-[1.02] transition-all duration-300">
              {/* Project Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-slate-100 mb-2 group-hover:text-blue-400 transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-slate-400 text-sm line-clamp-2 mb-3">
                    {project.description}
                  </p>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  {project.isPublic ? (
                    <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  )}
                </div>
              </div>

              {/* Project Info */}
              <div className="space-y-3 mb-4">
                {/* Category and Difficulty */}
                <div className="flex items-center justify-between">
                  <span className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded">
                    {project.category}
                  </span>
                  <span className={`text-xs font-medium ${getDifficultyColor(project.difficulty)}`}>
                    {project.difficulty}
                  </span>
                </div>

                {/* Status */}
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-1 text-xs rounded border ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                  <span className="text-slate-400 text-xs">
                    {formatDate(project.lastUpdated)}
                  </span>
                </div>

                {/* Progress Bar */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-slate-300 text-sm">Progress</span>
                    <span className="text-slate-400 text-sm">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {project.tags.slice(0, 3).map((tag, idx) => (
                    <span key={idx} className="px-2 py-0.5 bg-slate-700/50 text-slate-300 text-xs rounded">
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 3 && (
                    <span className="px-2 py-0.5 bg-slate-700/50 text-slate-400 text-xs rounded">
                      +{project.tags.length - 3}
                    </span>
                  )}
                </div>

                {/* Collaborators */}
                {project.collaborators.length > 1 && (
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span className="text-slate-400 text-xs">
                      {project.collaborators.length} collaborators
                    </span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-4 border-t border-slate-700/50">
                <Link 
                  to={`/projects/${project.id}`}
                  className="flex-1 btn-tech-secondary py-2 text-sm text-center"
                >
                  View Details
                </Link>
                <Link 
                  to={`/projects/${project.id}/edit`}
                  className="flex-1 btn-tech-primary py-2 text-sm text-center"
                >
                  Update Progress
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="tech-card p-12 text-center">
            <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-100 mb-2">No projects found</h3>
            <p className="text-slate-400 mb-6">
              {searchTerm || filterStatus !== 'All' || filterCategory !== 'All' 
                ? 'Try adjusting your filters or search terms'
                : 'Get started by creating your first project'
              }
            </p>
            {!searchTerm && filterStatus === 'All' && filterCategory === 'All' && (
              <Link to="/projects/new" className="btn-tech-primary px-6 py-2">
                Create Your First Project
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;