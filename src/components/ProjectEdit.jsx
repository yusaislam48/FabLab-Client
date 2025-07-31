import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

const ProjectEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Mock project data - in real app, this would be fetched from API
  const [project, setProject] = useState(null);
  const [formData, setFormData] = useState({
    status: '',
    progress: 0,
    updateNote: '',
    completedTasks: [''],
    nextSteps: [''],
    challenges: '',
    learnings: '',
    images: []
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const statuses = ['Planning', 'In Progress', 'Completed', 'On Hold'];

  // Load project data
  useEffect(() => {
    // Mock project data - in real app, fetch from API using id
    const mockProject = {
      id: parseInt(id),
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
      collaborators: [
        { email: "projectowner@iub.edu.bd", role: "Project Owner" },
        { email: "john.doe@iub.edu.bd", role: "Hardware Specialist" }
      ],
      isPublic: true,
      difficulty: "Intermediate"
    };
    
    setProject(mockProject);
    setFormData({
      status: mockProject.status,
      progress: mockProject.progress,
      updateNote: '',
      completedTasks: [''],
      nextSteps: [''],
      challenges: '',
      learnings: '',
      images: [],
      collaborators: mockProject.collaborators || [{ email: '', role: 'Project Owner' }]
    });
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'range' ? parseInt(value) : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleArrayChange = (arrayName, index, value) => {
    setFormData(prev => ({
      ...prev,
      [arrayName]: prev[arrayName].map((item, i) => i === index ? value : item)
    }));
  };

  const handleCollaboratorChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      collaborators: prev.collaborators.map((collaborator, i) => 
        i === index ? { ...collaborator, [field]: value } : collaborator
      )
    }));
  };

  const addArrayItem = (arrayName) => {
    if (arrayName === 'collaborators') {
      setFormData(prev => ({
        ...prev,
        collaborators: [...prev.collaborators, { email: '', role: '' }]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [arrayName]: [...prev[arrayName], '']
      }));
    }
  };

  const removeArrayItem = (arrayName, index) => {
    if (formData[arrayName].length > 1) {
      setFormData(prev => ({
        ...prev,
        [arrayName]: prev[arrayName].filter((_, i) => i !== index)
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.updateNote.trim()) {
      newErrors.updateNote = 'Update note is required';
    }
    
    if (formData.progress < 0 || formData.progress > 100) {
      newErrors.progress = 'Progress must be between 0 and 100';
    }
    
    // If status is completed, progress should be 100
    if (formData.status === 'Completed' && formData.progress !== 100) {
      newErrors.progress = 'Progress must be 100% for completed projects';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      
      try {
        // Clean up arrays by removing empty strings
        const updateData = {
          ...formData,
          completedTasks: formData.completedTasks.filter(t => t.trim()),
          nextSteps: formData.nextSteps.filter(s => s.trim()),
          lastUpdated: new Date().toISOString().split('T')[0],
          updateTimestamp: new Date().toISOString()
        };
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        console.log('Project updated:', { projectId: id, ...updateData });
        
        // Navigate back to projects page
        navigate('/projects', {
          state: {
            message: 'Project updated successfully!',
            updatedProject: { ...project, ...updateData }
          }
        });
        
      } catch (error) {
        setErrors({ submit: 'Failed to update project. Please try again.' });
      } finally {
        setIsLoading(false);
      }
    } else {
      setErrors(newErrors);
    }
  };

  const getProgressColor = () => {
    if (formData.progress >= 80) return 'from-green-500 to-emerald-500';
    if (formData.progress >= 50) return 'from-blue-500 to-cyan-500';
    if (formData.progress >= 25) return 'from-yellow-500 to-orange-500';
    return 'from-red-500 to-pink-500';
  };

  if (!project) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="tech-card p-8 text-center">
          <div className="w-8 h-8 border-2 border-blue-400/20 border-t-blue-400 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400">Loading project...</p>
        </div>
      </div>
    );
  }

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
                console.log('Back to Projects clicked from Edit!');
                navigate('/projects');
              }}
              className="text-slate-400 hover:text-slate-200 transition-colors bg-transparent border-none p-2 cursor-pointer"
              style={{ zIndex: 10 }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div>
              <h1 className="text-2xl font-bold text-slate-100">Update Progress</h1>
              <p className="text-slate-400">{project.name}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-4 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Update Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="tech-card p-8 space-y-6">
              {/* Status and Progress */}
              <div>
                <h2 className="text-xl font-bold text-slate-100 mb-6">Project Status</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Status */}
                  <div>
                    <label htmlFor="status" className="block text-slate-300 text-sm font-medium mb-2">
                      Status
                    </label>
                    <select
                      id="status"
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="tech-select"
                    >
                      {statuses.map(status => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </div>

                  {/* Progress */}
                  <div>
                    <label htmlFor="progress" className="block text-slate-300 text-sm font-medium mb-2">
                      Progress: {formData.progress}%
                    </label>
                    <input
                      type="range"
                      id="progress"
                      name="progress"
                      min="0"
                      max="100"
                      step="5"
                      value={formData.progress}
                      onChange={handleChange}
                      className="w-full h-3 bg-slate-700 rounded-lg appearance-none cursor-pointer range-slider"
                    />
                    <div className="flex justify-between text-xs text-slate-400 mt-1">
                      <span>0%</span>
                      <span>50%</span>
                      <span>100%</span>
                    </div>
                    {errors.progress && <p className="error-message">{errors.progress}</p>}
                  </div>
                </div>

                {/* Progress Bar Visualization */}
                <div className="mt-6">
                  <div className="w-full bg-slate-700 rounded-full h-4 mb-2">
                    <div 
                      className={`bg-gradient-to-r ${getProgressColor()} h-4 rounded-full transition-all duration-500 flex items-center justify-end pr-2`}
                      style={{ width: `${formData.progress}%` }}
                    >
                      {formData.progress > 10 && (
                        <span className="text-white text-xs font-bold">{formData.progress}%</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Update Note */}
              <div>
                <label htmlFor="updateNote" className="block text-slate-300 text-sm font-medium mb-2">
                  Update Note *
                </label>
                <textarea
                  id="updateNote"
                  name="updateNote"
                  value={formData.updateNote}
                  onChange={handleChange}
                  rows="4"
                  className={`input-tech ${errors.updateNote ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}`}
                  placeholder="Describe what you've accomplished in this update..."
                />
                {errors.updateNote && <p className="error-message">{errors.updateNote}</p>}
              </div>

              {/* Completed Tasks */}
              <div>
                <h3 className="text-lg font-bold text-slate-100 mb-4">Completed Tasks</h3>
                <div className="space-y-3">
                  {formData.completedTasks.map((task, index) => (
                    <div key={index} className="flex gap-3">
                      <input
                        type="text"
                        value={task}
                        onChange={(e) => handleArrayChange('completedTasks', index, e.target.value)}
                        className="input-tech flex-1"
                        placeholder="Enter completed task"
                      />
                      {formData.completedTasks.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeArrayItem('completedTasks', index)}
                          className="p-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-colors"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      )}
                    </div>
                  ))}
                  <div 
                    onClick={() => {
                      console.log('Add Completed Task div clicked!');
                      addArrayItem('completedTasks');
                    }}
                    className="flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors cursor-pointer p-3 border border-green-400/20 rounded-xl hover:bg-green-500/10 tech-card"
                    style={{ userSelect: 'none', zIndex: 50 }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add Completed Task
                  </div>
                </div>
              </div>

              {/* Next Steps */}
              <div>
                <h3 className="text-lg font-bold text-slate-100 mb-4">Next Steps</h3>
                <div className="space-y-3">
                  {formData.nextSteps.map((step, index) => (
                    <div key={index} className="flex gap-3">
                      <input
                        type="text"
                        value={step}
                        onChange={(e) => handleArrayChange('nextSteps', index, e.target.value)}
                        className="input-tech flex-1"
                        placeholder="Enter next step or milestone"
                      />
                      {formData.nextSteps.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeArrayItem('nextSteps', index)}
                          className="p-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-colors"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      )}
                    </div>
                  ))}
                  <div 
                    onClick={() => {
                      console.log('Add Next Step div clicked!');
                      addArrayItem('nextSteps');
                    }}
                    className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors cursor-pointer p-3 border border-blue-400/20 rounded-xl hover:bg-blue-500/10 tech-card"
                    style={{ userSelect: 'none', zIndex: 50 }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add Next Step
                  </div>
                </div>
              </div>

              {/* Collaborators */}
              <div>
                <h2 className="text-xl font-bold text-slate-100 mb-6">Team Collaborators</h2>
                <div className="space-y-4">
                  {formData.collaborators.map((collaborator, index) => (
                    <div key={index} className="p-4 border border-slate-700/50 rounded-xl bg-slate-800/30">
                      <div className="flex items-center gap-2 mb-3">
                        <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span className="text-slate-300 font-medium">
                          {index === 0 ? 'Project Owner' : `Collaborator ${index}`}
                        </span>
                        {index === 0 && (
                          <span className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded">Owner</span>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {/* Email Field */}
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                            </svg>
                          </div>
                          <input
                            type="email"
                            value={collaborator.email}
                            onChange={(e) => handleCollaboratorChange(index, 'email', e.target.value)}
                            placeholder={index === 0 ? "your@email.com (Project Owner)" : "collaborator@email.com"}
                            className="input-tech text-sm"
                            disabled={index === 0}
                          />
                        </div>

                        {/* Role Field */}
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 00-2 2H6a2 2 0 00-2-2V6m16 0v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2h16a2 2 0 012 2z" />
                            </svg>
                          </div>
                          <input
                            type="text"
                            value={collaborator.role}
                            onChange={(e) => handleCollaboratorChange(index, 'role', e.target.value)}
                            placeholder={index === 0 ? "Project Owner" : "e.g., Hardware, Software, Design, etc."}
                            className="input-tech text-sm"
                            disabled={index === 0}
                          />
                        </div>
                      </div>

                      {/* Remove Button - Only for non-owners */}
                      {index > 0 && (
                        <div className="flex justify-end mt-3">
                          <button
                            type="button"
                            onClick={() => removeArrayItem('collaborators', index)}
                            className="flex items-center gap-1 text-red-400 hover:text-red-300 text-sm transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Remove Collaborator
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                  <div 
                    onClick={() => {
                      console.log('Add Collaborator clicked!');
                      addArrayItem('collaborators');
                    }}
                    className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors cursor-pointer p-3 border border-purple-400/20 rounded-xl hover:bg-purple-500/10 tech-card"
                    style={{ userSelect: 'none', zIndex: 50 }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add Collaborator
                  </div>
                </div>
              </div>

              {/* Challenges */}
              <div>
                <label htmlFor="challenges" className="block text-slate-300 text-sm font-medium mb-2">
                  Challenges Encountered
                </label>
                <textarea
                  id="challenges"
                  name="challenges"
                  value={formData.challenges}
                  onChange={handleChange}
                  rows="3"
                  className="input-tech"
                  placeholder="Describe any problems or obstacles you've encountered..."
                />
              </div>

              {/* Learnings */}
              <div>
                <label htmlFor="learnings" className="block text-slate-300 text-sm font-medium mb-2">
                  Key Learnings
                </label>
                <textarea
                  id="learnings"
                  name="learnings"
                  value={formData.learnings}
                  onChange={handleChange}
                  rows="3"
                  className="input-tech"
                  placeholder="Share what you've learned or discovered during this update..."
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-4 pt-6 border-t border-slate-700/50">
                <Link to="/projects" className="btn-tech-secondary px-6 py-3">
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`btn-tech-primary px-12 py-3 flex-1 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                      <span>Updating...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                      </svg>
                      <span>Update Project</span>
                    </div>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Right Column - Project Info */}
          <div className="space-y-6">
            {/* Project Summary */}
            <div className="tech-card p-6">
              <h3 className="text-lg font-bold text-slate-100 mb-4">Project Summary</h3>
              <div className="space-y-3">
                <div>
                  <span className="text-slate-400 text-sm">Category:</span>
                  <p className="text-slate-200">{project.category}</p>
                </div>
                <div>
                  <span className="text-slate-400 text-sm">Difficulty:</span>
                  <p className="text-slate-200">{project.difficulty}</p>
                </div>
                <div>
                  <span className="text-slate-400 text-sm">Created:</span>
                  <p className="text-slate-200">{new Date(project.createdDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <span className="text-slate-400 text-sm">Est. Completion:</span>
                  <p className="text-slate-200">{new Date(project.estimatedCompletion).toLocaleDateString()}</p>
                </div>
              </div>
            </div>

            {/* Materials */}
            <div className="tech-card p-6">
              <h3 className="text-lg font-bold text-slate-100 mb-4">Materials</h3>
              <div className="space-y-2">
                {project.materials.map((material, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span className="text-slate-300 text-sm">{material}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Equipment */}
            <div className="tech-card p-6">
              <h3 className="text-lg font-bold text-slate-100 mb-4">Equipment</h3>
              <div className="space-y-2">
                {project.equipment.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span className="text-slate-300 text-sm">{item}</span>
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

export default ProjectEdit;