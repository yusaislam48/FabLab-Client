import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const BorrowKit = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('request');
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedEquipment, setSelectedEquipment] = useState([]);
  const [deadline, setDeadline] = useState('');
  const [purpose, setPurpose] = useState('');
  const [newEquipmentName, setNewEquipmentName] = useState('');
  const [newEquipmentQuantity, setNewEquipmentQuantity] = useState(1);
  const [newEquipmentDescription, setNewEquipmentDescription] = useState('');

  // Mock data - replace with actual API calls
  const [userProjects] = useState([
    { id: 1, name: 'Smart Home Automation', status: 'In Progress' },
    { id: 2, name: 'IoT Weather Station', status: 'Planning' },
    { id: 3, name: 'Robotic Arm Controller', status: 'In Progress' },
    { id: 4, name: 'Solar Panel Monitor', status: 'Testing' }
  ]);

  // Equipment categories for sidebar display
  const [availableEquipment] = useState([
    { id: 1, name: 'Arduino Uno R3', category: 'Microcontrollers', quantity: 15, available: 12 },
    { id: 2, name: 'Raspberry Pi 4', category: 'Single Board Computers', quantity: 8, available: 5 },
    { id: 3, name: 'Ultrasonic Sensor HC-SR04', category: 'Sensors', quantity: 20, available: 18 },
    { id: 4, name: 'Servo Motor SG90', category: 'Actuators', quantity: 25, available: 22 },
    { id: 5, name: 'Breadboard 830 points', category: 'Prototyping', quantity: 30, available: 28 },
    { id: 6, name: 'Jumper Wires Set', category: 'Accessories', quantity: 50, available: 45 },
    { id: 7, name: 'ESP32 DevKit', category: 'Microcontrollers', quantity: 10, available: 7 },
    { id: 8, name: 'LED Matrix 8x8', category: 'Displays', quantity: 12, available: 10 }
  ]);

  const [borrowHistory] = useState([
    {
      id: 1,
      requestDate: '2024-01-15',
      project: 'Smart Home Automation',
      equipment: ['Arduino Uno R3', 'Ultrasonic Sensor HC-SR04', 'Jumper Wires Set'],
      status: 'Active',
      deadline: '2024-04-15',
      returnDate: null,
      timeline: [
        { date: '2024-01-15', event: 'Request Submitted', status: 'completed' },
        { date: '2024-01-16', event: 'Request Approved', status: 'completed' },
        { date: '2024-01-17', event: 'Equipment Ready for Pickup', status: 'completed' },
        { date: '2024-01-18', event: 'Equipment Collected', status: 'completed' },
        { date: '2024-04-15', event: 'Return Due', status: 'pending' }
      ]
    },
    {
      id: 2,
      requestDate: '2023-11-20',
      project: 'IoT Weather Station',
      equipment: ['Raspberry Pi 4', 'Temperature Sensor'],
      status: 'Returned',
      deadline: '2024-02-20',
      returnDate: '2024-02-18',
      timeline: [
        { date: '2023-11-20', event: 'Request Submitted', status: 'completed' },
        { date: '2023-11-21', event: 'Request Approved', status: 'completed' },
        { date: '2023-11-22', event: 'Equipment Collected', status: 'completed' },
        { date: '2024-02-18', event: 'Equipment Returned', status: 'completed' }
      ]
    }
  ]);

  const [activeRequests] = useState([
    {
      id: 1,
      project: 'Smart Home Automation',
      equipment: ['Arduino Uno R3', 'Ultrasonic Sensor HC-SR04', 'Jumper Wires Set'],
      borrowDate: '2024-01-18',
      deadline: '2024-04-15',
      daysLeft: 45,
      canExtend: true
    }
  ]);

  // Calculate max date (3 months from today)
  const getMaxDate = () => {
    const today = new Date();
    const maxDate = new Date(today);
    maxDate.setMonth(maxDate.getMonth() + 3);
    return maxDate.toISOString().split('T')[0];
  };

  const addEquipment = () => {
    if (newEquipmentName.trim()) {
      const newEquipment = {
        id: Date.now(),
        name: newEquipmentName,
        quantity: newEquipmentQuantity,
        description: newEquipmentDescription
      };
      setSelectedEquipment(prev => [...prev, newEquipment]);
      setNewEquipmentName('');
      setNewEquipmentQuantity(1);
      setNewEquipmentDescription('');
    }
  };

  const removeEquipment = (equipmentId) => {
    setSelectedEquipment(prev => prev.filter(item => item.id !== equipmentId));
  };

  const updateEquipmentQuantity = (equipmentId, quantity) => {
    setSelectedEquipment(prev =>
      prev.map(item =>
        item.id === equipmentId ? { ...item, quantity: parseInt(quantity) } : item
      )
    );
  };

  const handleSubmitRequest = () => {
    // Simulate request submission
    alert('Borrow request submitted successfully! You will be notified once approved.');
    setSelectedProject('');
    setSelectedEquipment([]);
    setDeadline('');
    setPurpose('');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'text-green-400 bg-green-400/20';
      case 'Pending': return 'text-yellow-400 bg-yellow-400/20';
      case 'Returned': return 'text-slate-400 bg-slate-400/20';
      case 'Overdue': return 'text-red-400 bg-red-400/20';
      default: return 'text-slate-400 bg-slate-400/20';
    }
  };

  const tabs = [
    {
      id: 'request',
      name: 'New Request',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      )
    },
    {
      id: 'active',
      name: 'Active Borrows',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      )
    },
    {
      id: 'history',
      name: 'History',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
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
              onClick={() => navigate('/dashboard')}
              className="text-slate-400 hover:text-slate-200 transition-colors bg-transparent border-none p-2 cursor-pointer"
              style={{ zIndex: 10 }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-slate-100 mb-1">Borrow Kit</h1>
              <p className="text-slate-400 text-sm">Request hardware equipment for your projects</p>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-4 text-sm text-slate-400 mr-4">
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <span>{activeRequests.length} Active</span>
              </div>
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{borrowHistory.length} Total</span>
              </div>
            </div>
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
                  {tab.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* New Request Tab */}
            {activeTab === 'request' && (
              <div className="animate-fade-in space-y-6">
                {/* Request Form */}
                <div className="tech-card p-6">
                  <h2 className="text-xl font-bold text-slate-100 mb-6">Submit Equipment Request</h2>
                  
                  <div className="space-y-6">
                    {/* Project Selection */}
                    <div>
                      <label className="block text-slate-300 text-sm font-medium mb-2">
                        Select Project *
                      </label>
                      <select
                        value={selectedProject}
                        onChange={(e) => setSelectedProject(e.target.value)}
                        className="tech-select w-full"
                        required
                      >
                        <option value="">Choose a project...</option>
                        {userProjects.map((project) => (
                          <option key={project.id} value={project.id}>
                            {project.name} ({project.status})
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Deadline */}
                    <div>
                      <label className="block text-slate-300 text-sm font-medium mb-2">
                        Return Deadline *
                      </label>
                      <input
                        type="date"
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        max={getMaxDate()}
                        className="tech-select w-full"
                        required
                      />
                      <p className="text-slate-500 text-xs mt-1">Maximum borrowing period: 3 months</p>
                    </div>

                    {/* Purpose */}
                    <div>
                      <label className="block text-slate-300 text-sm font-medium mb-2">
                        Purpose of Use *
                      </label>
                      <textarea
                        value={purpose}
                        onChange={(e) => setPurpose(e.target.value)}
                        placeholder="Briefly describe how you'll use these equipment for your project..."
                        className="input-tech w-full h-24 resize-none"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Add Equipment Section */}
                <div className="tech-card p-6">
                  <h3 className="text-lg font-bold text-slate-100 mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Equipment List
                  </h3>

                  {/* Add New Equipment Form */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6 p-4 bg-slate-800/50 rounded-lg border border-slate-700/50">
                    <div className="md:col-span-4">
                      <input
                        type="text"
                        value={newEquipmentName}
                        onChange={(e) => setNewEquipmentName(e.target.value)}
                        placeholder="Equipment name..."
                        className="input-tech w-full"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <input
                        type="number"
                        min="1"
                        value={newEquipmentQuantity}
                        onChange={(e) => setNewEquipmentQuantity(parseInt(e.target.value) || 1)}
                        placeholder="Qty"
                        className="input-tech w-full"
                      />
                    </div>
                    <div className="md:col-span-4">
                      <input
                        type="text"
                        value={newEquipmentDescription}
                        onChange={(e) => setNewEquipmentDescription(e.target.value)}
                        placeholder="Description (optional)..."
                        className="input-tech w-full"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <div
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          addEquipment();
                        }}
                        className="tech-card w-full h-12 flex items-center justify-center cursor-pointer hover:border-blue-500/50 transition-all duration-200 bg-blue-500/10"
                        style={{ zIndex: 50, pointerEvents: 'auto' }}
                      >
                        <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Equipment List */}
                  <div className="space-y-3">
                    {selectedEquipment.length === 0 ? (
                      <div className="text-center py-8 text-slate-400">
                        <svg className="w-12 h-12 mx-auto mb-3 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                        <p>No equipment added yet</p>
                        <p className="text-sm">Add equipment using the form above</p>
                      </div>
                    ) : (
                      selectedEquipment.map((item) => (
                        <div key={item.id} className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg border border-slate-700/50">
                          <div className="flex-1">
                            <div className="flex items-center gap-3">
                              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                              <div>
                                <span className="text-slate-200 font-medium">{item.name}</span>
                                {item.description && (
                                  <span className="text-slate-400 text-sm ml-2">- {item.description}</span>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2">
                              <span className="text-slate-400 text-sm">Qty:</span>
                              <input
                                type="number"
                                min="1"
                                value={item.quantity}
                                onChange={(e) => updateEquipmentQuantity(item.id, e.target.value)}
                                className="w-16 px-2 py-1 bg-slate-700 border border-slate-600 rounded text-slate-200 text-sm"
                              />
                            </div>
                            <button
                              onClick={() => removeEquipment(item.id)}
                              className="text-red-400 hover:text-red-300 transition-colors"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="mt-6 pt-6 border-t border-slate-700/50">
                    <button
                      onClick={handleSubmitRequest}
                      disabled={!selectedProject || selectedEquipment.length === 0 || !deadline || !purpose}
                      className="btn-tech-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Submit Equipment Request
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Active Borrows Tab */}
            {activeTab === 'active' && (
              <div className="animate-fade-in space-y-6">
                {activeRequests.length > 0 ? (
                activeRequests.map((request) => (
                  <div key={request.id} className="tech-card p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-slate-100">{request.project}</h3>
                        <p className="text-slate-400">Borrowed on {new Date(request.borrowDate).toLocaleDateString()}</p>
                      </div>
                      <div className="text-right">
                        <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                          request.daysLeft > 7 ? 'text-green-400 bg-green-400/20' :
                          request.daysLeft > 0 ? 'text-yellow-400 bg-yellow-400/20' :
                          'text-red-400 bg-red-400/20'
                        }`}>
                          {request.daysLeft > 0 ? `${request.daysLeft} days left` : 'Overdue'}
                        </div>
                        <p className="text-slate-500 text-sm mt-1">Due: {new Date(request.deadline).toLocaleDateString()}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-slate-300 font-medium mb-3">Borrowed Equipment</h4>
                        <div className="space-y-2">
                          {request.equipment.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-slate-400">
                              <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-3">
                        {request.canExtend && (
                          <button className="w-full p-4 bg-slate-800/50 border border-slate-600/50 rounded-xl text-slate-200 hover:bg-slate-700/50 hover:border-slate-500/50 transition-all duration-200 flex items-center justify-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="font-medium">Request Extension</span>
                          </button>
                        )}
                        <button className="w-full p-4 bg-gradient-to-r from-blue-500 to-blue-600 border border-blue-400/30 rounded-xl text-white hover:from-blue-600 hover:to-blue-700 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="font-medium">Mark as Returned</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="tech-card p-12 text-center">
                  <div className="w-16 h-16 bg-slate-700 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-slate-300 mb-2">No Active Borrows</h3>
                  <p className="text-slate-500">You don't have any equipment currently borrowed.</p>
                </div>
              )}
            </div>
          )}

          {/* History Tab */}
          {activeTab === 'history' && (
            <div className="animate-fade-in space-y-6">
              {borrowHistory.map((record) => (
                <div key={record.id} className="tech-card p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-bold text-slate-100">{record.project}</h3>
                      <p className="text-slate-400">Requested on {new Date(record.requestDate).toLocaleDateString()}</p>
                    </div>
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(record.status)}`}>
                      {record.status}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Equipment List */}
                    <div>
                      <h4 className="text-slate-300 font-medium mb-3">Equipment</h4>
                      <div className="space-y-2">
                        {record.equipment.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-slate-400">
                            <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                      {record.returnDate && (
                        <p className="text-green-400 text-sm mt-4">
                          Returned on {new Date(record.returnDate).toLocaleDateString()}
                        </p>
                      )}
                    </div>

                    {/* Timeline */}
                    <div>
                      <h4 className="text-slate-300 font-medium mb-3">Timeline</h4>
                      <div className="space-y-3">
                        {record.timeline.map((event, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <div className={`w-3 h-3 rounded-full mt-1 ${
                              event.status === 'completed' ? 'bg-green-400' :
                              event.status === 'pending' ? 'bg-yellow-400' :
                              'bg-slate-600'
                            }`}></div>
                            <div className="flex-1">
                              <p className="text-slate-300 text-sm font-medium">{event.event}</p>
                              <p className="text-slate-500 text-xs">{new Date(event.date).toLocaleDateString()}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="tech-card p-6">
              <h3 className="text-lg font-bold text-slate-100 mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-sm">Active Requests</span>
                  <span className="text-slate-200 font-medium">{activeRequests.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-sm">Total Requests</span>
                  <span className="text-slate-200 font-medium">{borrowHistory.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-sm">On Time Returns</span>
                  <span className="text-green-400 font-medium">
                    {borrowHistory.filter(h => h.status === 'Returned').length}
                  </span>
                </div>

              </div>
            </div>

            {/* Guidelines */}
            <div className="tech-card p-6">
              <h3 className="text-lg font-bold text-slate-100 mb-4">Borrowing Guidelines</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                  <p className="text-slate-300">Maximum borrowing period is 3 months</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                  <p className="text-slate-300">Extensions can be requested before deadline</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                  <p className="text-slate-300">Equipment must be returned in good condition</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                  <p className="text-slate-300">Late returns may affect future borrowing privileges</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BorrowKit;