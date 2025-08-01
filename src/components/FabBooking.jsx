import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import FloorPlan from './FloorPlan'

function FabBooking() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('')
  const [selectedSeats, setSelectedSeats] = useState([])
  const [bookingStep, setBookingStep] = useState(1) // 1: select seats, 2: select time, 3: confirm
  const [availableSlots, setAvailableSlots] = useState([])

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
  }, [selectedDate])

  const handleSeatSelect = (seatId) => {
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(id => id !== seatId))
    } else {
      setSelectedSeats([...selectedSeats, seatId])
    }
  }

  const handleTimeSlotSelect = (slotId) => {
    setSelectedTimeSlot(slotId)
  }

  const handleBooking = () => {
    // Here you would make an API call to book the seats
    alert(`Booking confirmed for ${selectedSeats.length} seat(s) on ${selectedDate} at ${availableSlots.find(slot => slot.id === selectedTimeSlot)?.time}`)
    // Reset booking state
    setSelectedSeats([])
    setSelectedTimeSlot('')
    setBookingStep(1)
  }

  const canProceedToTimeSelection = selectedSeats.length > 0
  const canProceedToConfirmation = selectedTimeSlot !== ''

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="p-2 bg-slate-800/50 border border-slate-600/50 rounded-xl hover:bg-slate-700/50 transition-all duration-300">
              <svg className="w-6 h-6 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
              </svg>
            </Link>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                FabBooking
              </h1>
              <p className="text-slate-400 mt-1">Reserve your workspace in the IUB FabLab</p>
            </div>
          </div>
          
          {/* Progress Steps */}
          <div className="flex items-center gap-4">
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                  bookingStep >= step
                    ? 'bg-blue-500 border-blue-500 text-white'
                    : 'border-slate-600 text-slate-400'
                }`}
              >
                {step}
              </div>
            ))}
          </div>
        </div>

        {/* Date Selection */}
        <div className="tech-card p-6 mb-6">
          <h2 className="text-xl font-semibold text-slate-100 mb-4">Select Date</h2>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            className="input-tech max-w-xs"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Floor Plan */}
        <div className="lg:col-span-2">
          <div className="tech-card p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-slate-100">
                {bookingStep === 1 ? 'Select Workspaces' : 'Selected Workspaces'}
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
              disabled={bookingStep !== 1}
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
                    {bookingStep === 1 && (
                      <button
                        onClick={() => handleSeatSelect(seatId)}
                        className="text-red-400 hover:text-red-300 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Time Slot Selection */}
          {bookingStep >= 2 && (
            <div className="tech-card p-6">
              <h3 className="text-lg font-semibold text-slate-100 mb-4">Select Time Slot</h3>
              <div className="grid grid-cols-1 gap-3 max-h-64 overflow-y-auto">
                {availableSlots.map((slot) => (
                  <button
                    key={slot.id}
                    onClick={() => handleTimeSlotSelect(slot.id)}
                    disabled={!slot.available || bookingStep > 2}
                    className={`p-3 text-left rounded-lg border transition-all duration-300 ${
                      selectedTimeSlot === slot.id
                        ? 'bg-blue-500/20 border-blue-400 text-blue-300'
                        : slot.available
                        ? 'bg-slate-800/50 border-slate-600/50 text-slate-200 hover:bg-slate-700/50'
                        : 'bg-slate-800/30 border-slate-700/30 text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    <div className="font-medium">{slot.time}</div>
                    <div className="text-xs opacity-75">
                      {slot.available ? 'Available' : 'Booked'}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Booking Summary */}
          {bookingStep >= 3 && (
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
            {bookingStep === 1 && (
              <button
                onClick={() => setBookingStep(2)}
                disabled={!canProceedToTimeSelection}
                className={`btn-tech-primary ${
                  !canProceedToTimeSelection ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                                 Proceed to Time Selection
              </button>
            )}
            
            {bookingStep === 2 && (
              <div className="space-y-2">
                <button
                  onClick={() => setBookingStep(3)}
                  disabled={!canProceedToConfirmation}
                  className={`btn-tech-primary ${
                    !canProceedToConfirmation ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                                     Review Reservation
                </button>
                <button
                  onClick={() => setBookingStep(1)}
                  className="btn-tech-secondary w-full"
                >
                  Back to Seat Selection
                </button>
              </div>
            )}
            
            {bookingStep === 3 && (
              <div className="space-y-2">
                <button
                  onClick={handleBooking}
                  className="btn-tech-primary"
                >
                                     Confirm Reservation
                </button>
                <button
                  onClick={() => setBookingStep(2)}
                  className="btn-tech-secondary w-full"
                >
                  Back to Time Selection
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FabBooking