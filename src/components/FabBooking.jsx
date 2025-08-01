import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import FloorPlan from './FloorPlan'

function FabBooking() {
  const navigate = useNavigate()
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('')
  const [selectedSeats, setSelectedSeats] = useState([])
  const [bookingStep, setBookingStep] = useState(1) // 1: select date/time, 2: select seats, 3: confirm
  const [availableSlots, setAvailableSlots] = useState([])
  const [isLoadingAvailability, setIsLoadingAvailability] = useState(false)
  const [showFloorPlan, setShowFloorPlan] = useState(false)

  // Generate time slots for the day (8 AM to 8 PM, 1-hour slots)
  const generateTimeSlots = () => {
    const slots = []
    for (let hour = 8; hour <= 20; hour++) {
      const startTime = `${hour.toString().padStart(2, '0')}:00`
      const endTime = `${(hour + 1).toString().padStart(2, '0')}:00`
      slots.push({
        id: `${hour}`,
        time: `${startTime} - ${endTime}`,
        available: Math.random() > 0.3 // Random availability for demo
      })
    }
    return slots
  }

  useEffect(() => {
    setAvailableSlots(generateTimeSlots())
  }, [])

  // Handle checking availability when both date and time are selected
  const handleCheckAvailability = async () => {
    if (!selectedDate || !selectedTimeSlot) return

    setIsLoadingAvailability(true)
    setShowFloorPlan(false)
    setBookingStep(2)

    try {
      // Simulate API call to fetch seat availability
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Show floor plan after data is loaded
      setShowFloorPlan(true)
    } catch (error) {
      console.error('Failed to fetch availability:', error)
    } finally {
      setIsLoadingAvailability(false)
    }
  }

  const handleSeatSelect = (seatId) => {
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(id => id !== seatId))
    } else {
      setSelectedSeats([...selectedSeats, seatId])
    }
  }



  const handleBooking = () => {
    // Here you would make an API call to book the seats
    alert(`Booking confirmed for ${selectedSeats.length} seat(s) on ${selectedDate} at ${availableSlots.find(slot => slot.id === selectedTimeSlot)?.time}`)
    // Reset booking state
    setSelectedSeats([])
    setSelectedTimeSlot('')
    setBookingStep(1)
  }

  const canProceedToConfirmation = selectedSeats.length > 0

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
                console.log('Back to Dashboard clicked!');
                navigate('/dashboard');
              }}
              className="text-slate-400 hover:text-slate-200 transition-colors bg-transparent border-none p-2 cursor-pointer"
              style={{ zIndex: 10 }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div>
              <h1 className="text-2xl font-bold text-slate-100">FabBooking</h1>
              <p className="text-slate-400">Reserve your workspace in the IUB FabLab</p>
            </div>
          </div>
          
          {/* Progress Steps */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-300 ${
                selectedDate && selectedTimeSlot ? 'bg-blue-500 border-blue-500 text-white' : 'border-slate-600 text-slate-400'
              }`}>
                1
              </div>
              <span className="text-xs text-slate-400">Date & Time</span>
            </div>
            <div className="w-8 h-px bg-slate-600"></div>
            <div className="flex items-center gap-2">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-300 ${
                showFloorPlan ? 'bg-blue-500 border-blue-500 text-white' : 'border-slate-600 text-slate-400'
              }`}>
                2
              </div>
              <span className="text-xs text-slate-400">Select Seats</span>
            </div>
            <div className="w-8 h-px bg-slate-600"></div>
            <div className="flex items-center gap-2">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-300 ${
                selectedSeats.length > 0 ? 'bg-blue-500 border-blue-500 text-white' : 'border-slate-600 text-slate-400'
              }`}>
                3
              </div>
              <span className="text-xs text-slate-400">Confirm</span>
            </div>
          </div>
        </div>
      </header>

      {/* Date & Time Selection */}
      <div className="mx-4 max-w-7xl mx-auto">
        <div className="tech-card p-8 mb-6">
          <h2 className="text-xl font-semibold text-slate-100 mb-6">Select Date & Time</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Modern Date Selection */}
            <div className="space-y-2">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                <div className="relative bg-slate-800/60 backdrop-blur-sm border border-slate-600/50 rounded-xl p-4 transition-all duration-300 hover:border-blue-400/50 focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-400/20">
                  <div className="flex items-center gap-3">
                    <div className="text-slate-400 group-focus-within:text-blue-400 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="bg-transparent text-slate-100 text-lg font-medium placeholder-slate-400 border-none outline-none w-full"
                    />
                  </div>
                  <div className="text-xs text-slate-500 mt-2 ml-8">
                    {new Date(selectedDate).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Modern Time Selection */}
            <div className="space-y-2">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                <div className="relative bg-slate-800/60 backdrop-blur-sm border border-slate-600/50 rounded-xl p-4 transition-all duration-300 hover:border-purple-400/50 focus-within:border-purple-400 focus-within:ring-2 focus-within:ring-purple-400/20">
                  <div className="flex items-center gap-3">
                    <div className="text-slate-400 group-focus-within:text-purple-400 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <select
                      value={selectedTimeSlot}
                      onChange={(e) => setSelectedTimeSlot(e.target.value)}
                      className="bg-transparent text-slate-100 text-lg font-medium border-none outline-none w-full appearance-none cursor-pointer"
                    >
                      <option value="" className="bg-slate-800 text-slate-400">Choose your time...</option>
                      {availableSlots.map((slot) => (
                        <option key={slot.id} value={slot.id} className="bg-slate-800 text-slate-100">
                          {slot.time}
                        </option>
                      ))}
                    </select>
                    <div className="text-slate-400 group-focus-within:text-purple-400 transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                  {selectedTimeSlot && (
                    <div className="text-xs text-slate-500 mt-2 ml-8">
                      Duration: 1 hour • {availableSlots.find(slot => slot.id === selectedTimeSlot)?.available ? '✅ Available' : '❌ Unavailable'}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Check Availability Button */}
          <div className="mt-6">
            <button
              onClick={handleCheckAvailability}
              disabled={!selectedDate || !selectedTimeSlot || isLoadingAvailability}
              className={`btn-tech-primary w-full md:w-auto px-8 py-3 ${
                (!selectedDate || !selectedTimeSlot) ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isLoadingAvailability ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                  <span>Checking Availability...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span>Check Availability</span>
                </div>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      {(isLoadingAvailability || showFloorPlan) && (
        <div className="mx-4 max-w-7xl mx-auto">
          {isLoadingAvailability ? (
            /* Loading State */
            <div className="tech-card p-12 text-center">
              <div className="flex flex-col items-center gap-6">
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-slate-600 border-t-blue-500 rounded-full animate-spin"></div>
                  <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-purple-500 rounded-full animate-spin animation-delay-150"></div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-slate-100">Fetching Availability Data</h3>
                  <p className="text-slate-400">
                    Checking seat availability for {selectedDate} at {availableSlots.find(slot => slot.id === selectedTimeSlot)?.time}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <span>Connecting to server...</span>
                </div>
              </div>
            </div>
          ) : (
            /* Floor Plan */
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="tech-card p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-slate-100">
                      Select Workspaces
                    </h2>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-green-500 rounded"></div>
                        <span className="text-slate-300">Available</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-red-500 rounded"></div>
                        <span className="text-slate-300">Occupied</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-blue-500 rounded"></div>
                        <span className="text-slate-300">Selected</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-slate-600 rounded"></div>
                        <span className="text-slate-300">Disabled</span>
                      </div>
                    </div>
                  </div>
                  
                  <FloorPlan
                    selectedSeats={selectedSeats}
                    onSeatSelect={handleSeatSelect}
                    disabled={false}
                  />
                </div>
              </div>

              {/* Booking Panel */}
              <div className="space-y-6">
                {/* Selected Seats */}
                <div className="tech-card p-6">
                  <h3 className="text-lg font-semibold text-slate-100 mb-4">Selected Workspaces</h3>
                  {selectedSeats.length === 0 ? (
                    <p className="text-slate-400 text-sm">No workspaces selected</p>
                  ) : (
                    <div className="space-y-2">
                      {selectedSeats.map((seatId) => (
                        <div
                          key={seatId}
                          className="flex items-center justify-between p-3 bg-slate-800/50 border border-slate-600/50 rounded-lg"
                        >
                          <span className="text-slate-200 text-sm font-medium">{seatId}</span>
                          <button
                            onClick={() => handleSeatSelect(seatId)}
                            className="text-red-400 hover:text-red-300 transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Booking Summary */}
                {selectedSeats.length > 0 && (
                  <div className="tech-card p-6">
                    <h3 className="text-lg font-semibold text-slate-100 mb-4">Reservation Summary</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Date:</span>
                        <span className="text-slate-200">{selectedDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Time:</span>
                        <span className="text-slate-200">
                          {availableSlots.find(slot => slot.id === selectedTimeSlot)?.time}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Workspaces:</span>
                        <span className="text-slate-200">{selectedSeats.length}</span>
                      </div>
                      <div className="border-t border-slate-600/50 pt-3">
                        <div className="flex justify-between font-semibold">
                          <span className="text-slate-200">Total:</span>
                          <span className="text-blue-400">Free</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={handleBooking}
                    disabled={!canProceedToConfirmation}
                    className={`btn-tech-primary ${
                      !canProceedToConfirmation ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {selectedSeats.length > 0 ? `Confirm Reservation (${selectedSeats.length} seats)` : 'Select Seats to Continue'}
                  </button>
                  
                  <button
                    onClick={() => {
                      setShowFloorPlan(false)
                      setSelectedSeats([])
                      setBookingStep(1)
                    }}
                    className="btn-tech-secondary w-full"
                  >
                    Change Date/Time
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default FabBooking