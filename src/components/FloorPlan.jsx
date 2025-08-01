import { useState, useEffect } from 'react'

// Accurate FabLab layout matching the real floor plan
const ZONES = {
  // Entry area (top-left, non-bookable)
  entry: {
    name: 'Entry',
    x: 100,
    y: 10,
    width: 80,
    height: 40,
    color: 'bg-slate-600/30',
    bookable: false,
  },
  
  // Main pink work area (top center) - the large pink area with blue squares
  mainWorkArea: {
    name: 'Collaborative Workspace',
    x: 200,
    y: 10,
    width: 180,
    height: 40,
    color: 'bg-pink-900/30',
    bookable: true,
    seats: [
      { id: 'CS-A1', name: 'Collaborative Seat A1', x: 220, y: 60, type: 'chair' },
      { id: 'CS-A2', name: 'Collaborative Seat A2', x: 240, y: 60, type: 'chair' },
      { id: 'CS-A3', name: 'Collaborative Seat A3', x: 260, y: 60, type: 'chair' },
      { id: 'CS-A4', name: 'Collaborative Seat A4', x: 280, y: 60, type: 'chair' },
      { id: 'CS-A5', name: 'Collaborative Seat A5', x: 300, y: 60, type: 'chair' },
      { id: 'CS-A6', name: 'Collaborative Seat A6', x: 320, y: 60, type: 'chair' },
      { id: 'CS-A7', name: 'Collaborative Seat A7', x: 340, y: 60, type: 'chair' },
      { id: 'CS-A8', name: 'Collaborative Seat A8', x: 360, y: 60, type: 'chair' },
    ]
  },

  // Wood Workshop (top-right)
  woodWorkshop: {
    name: 'Wood Workshop',
    x: 400,
    y: 10,
    width: 120,
    height: 40,
    color: 'bg-blue-400/30',
    bookable: false,
  },

  //exit gate
  exitGate: {
    name: 'Exit Gate',
    x: 540,
    y: 10,
    width: 80,  
    height: 40,
    color: 'bg-slate-600/30',
    bookable: false,
  },

  // Instruments Zone (far right)
  instrumentsZone: {
    name: 'Instruments Zone',
    x: 540,
    y: 60,
    width: 80,
    height: 120,
    color: 'bg-gray-300/30',
    bookable: false,
  },

  // Meeting Zone (center-left, pink area with blue squares around it)
  meetingZone: {
    name: 'Conference Zone',
    x: 260,
    y: 190,
    width: 130,
    height: 60,
    color: 'bg-pink-900/30',
    bookable: true,
    seats: [
      // { id: 'MZ-T1', name: 'Meeting Table', x: 240, y: 210, type: 'table' },
      // Blue squares around the meeting area
      { id: 'MZ-C1', name: 'Conference Chair 1', x: 280, y: 180, type: 'chair' },
      { id: 'MZ-C2', name: 'Meeting Chair 2', x: 310, y: 180, type: 'chair' },
      { id: 'MZ-C3', name: 'Meeting Chair 3', x: 340, y: 180, type: 'chair' },
      { id: 'MZ-C4', name: 'Meeting Chair 4', x: 370, y: 180, type: 'chair' },

      { id: 'MZ-C5', name: 'Meeting Chair 5', x: 280, y: 260, type: 'chair' },
      { id: 'MZ-C6', name: 'Meeting Chair 6', x: 310, y: 260, type: 'chair' },
      { id: 'MZ-C7', name: 'Meeting Chair 7', x: 340, y: 260, type: 'chair' },
      { id: 'MZ-C8', name: 'Meeting Chair 8', x: 370, y: 260, type: 'chair' },
    ]
  },

  // Waiting Area (bottom left)
  waitingArea: {
    name: 'Waiting Area',
    x: 0,
    y: 70,
    width: 90,
    height: 80,
    bookable: false,
  },

  // R&D Office (left side, non-bookable)
  rndOffice: {
    name: "R&D Office's Desk",
    x: 0,
    y: 200,
    width: 90,
    height: 100,
    color: 'bg-slate-600/30',
    bookable: false
  },

  // Water Filter (bottom left, non-bookable)
  waterFilter: {
    name: 'Water Filter',
    x: 0,
    y: 390,
    width: 80,
    height: 40,
    color: 'bg-slate-600/30',
    bookable: false
  },

  // Electronics Zone (bottom left)
  electronicsZone: {
    name: 'Electronics Zone',
    x: 100,
    y: 390,
    width: 120,
    height: 40,
    color: 'bg-slate-700/30',
    bookable: false,
  },

  // Showcasing Zone (bottom center-left)
  showcasingZone: {
    name: 'Showcasing Zone',
    x: 230,
    y: 390,
    width: 120,
    height: 40,
    color: 'bg-slate-700/30',
    bookable: false,
  },

  // Computer Zone (bottom center-right)
  computerZone: {
    name: 'Computer',
    x: 360,
    y: 390,
    width: 80,
    height: 40,
    color: 'bg-slate-700/30',
    bookable: false,
  },

  // Digital Fabrication Zone (bottom right)
  digitalFabrication: {
    name: 'Digital Fabrication Zone',
    x: 450,
    y: 310,
    width: 170,
    height: 120,
    color: 'bg-blue-600/30',
    bookable: false,
  },

  //cnc zone
  cncZone: {
    name: 'CNC Zone',
    x: 625,
    y: 10,
    width: 50,
    height: 420,
    color: 'bg-blue-600/30',
    bookable: false,
  },  // Instruments Zone (far right)
  // instrumentsZone: {
  //   name: 'Instruments Zone',
  //   x: 540,
  //   y: 60,
  //   width: 80,
  //   height: 120,
  //   color: 'bg-gray-300/30',
  //   bookable: false,
  // },

  // Crafting Zone (right side)
  craftingZone: {
    name: 'Crafting Zone',
    x: 540,
    y: 190,
    width: 80,
    height: 110,
    color: 'bg-pink-900/30',
    bookable: false,
  },

}

// Cross-shaped workstation clusters (6 clusters in 2 rows of 3)
const WORKSTATION_CLUSTERS = [
  // Top row
  { id: 'WS1', x: 170, y: 120, seats: ['WS1-C1', 'WS1-C2', 'WS1-C3', 'WS1-C4'] },
  { id: 'WS2', x: 230, y: 120, seats: ['WS2-C1', 'WS2-C2', 'WS2-C3', 'WS2-C4'] },
  { id: 'WS3', x: 290, y: 120, seats: ['WS3-C1', 'WS3-C2', 'WS3-C3', 'WS3-C4'] },
  { id: 'WS4', x: 350, y: 120, seats: ['WS4-C1', 'WS4-C2', 'WS4-C3', 'WS4-C4'] },
  { id: 'WS5', x: 410, y: 120, seats: ['WS5-C1', 'WS5-C2', 'WS5-C3', 'WS5-C4'] },
  { id: 'WS6', x: 470, y: 120, seats: ['WS6-C1', 'WS6-C2', 'WS6-C3', 'WS6-C4'] },
  
  // Bottom row
  { id: 'WS7', x: 170, y: 320, seats: ['WS7-C1', 'WS7-C2', 'WS7-C3', 'WS7-C4'] },
  { id: 'WS8', x: 230, y: 320, seats: ['WS8-C1', 'WS8-C2', 'WS8-C3', 'WS8-C4'] },
  { id: 'WS9', x: 290, y: 320, seats: ['WS9-C1', 'WS9-C2', 'WS9-C3', 'WS9-C4'] },
  { id: 'WS10', x: 350, y: 320, seats: ['WS10-C1', 'WS10-C2', 'WS10-C3', 'WS10-C4'] },
]

function FloorPlan({ selectedSeats, onSeatSelect, disabled = false }) {
  const [hoveredSeat, setHoveredSeat] = useState(null)
  const [seatAvailability, setSeatAvailability] = useState({})

  // Generate random availability for demo
  useEffect(() => {
    const availability = {}
    
    // Zone seats (only for bookable zones)
    Object.values(ZONES).forEach(zone => {
      if (zone.bookable && zone.seats) {
        zone.seats.forEach(seat => {
          availability[seat.id] = Math.random() > 0.3 // 70% available
        })
      }
    })
    
    // Workstation seats
    WORKSTATION_CLUSTERS.forEach(cluster => {
      cluster.seats.forEach(seatId => {
        availability[seatId] = Math.random() > 0.3 // 70% available
      })
    })
    
    setSeatAvailability(availability)
  }, [])

  const getSeatStatus = (seatId) => {
    if (selectedSeats.includes(seatId)) return 'selected'
    if (!seatAvailability[seatId]) return 'occupied'
    return 'available'
  }

  const getSeatColor = (seatId) => {
    const status = getSeatStatus(seatId)
    switch (status) {
      case 'selected': return 'bg-blue-500 border-blue-400'
      case 'occupied': return 'bg-red-500 border-red-400'
      case 'available': return 'bg-green-500 border-green-400'
      default: return 'bg-slate-600 border-slate-500'
    }
  }

  const handleSeatClick = (seatId) => {
    if (disabled || !seatAvailability[seatId]) return
    onSeatSelect(seatId)
  }

  const getSeatIcon = (type) => {
    switch (type) {
      case 'table':
        return (
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
            <rect x="2" y="10" width="20" height="4" rx="2"/>
            <path d="M4 14v6M20 14v6"/>
          </svg>
        )
      case 'chair':
        return (
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 3v6h12V3c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2z"/>
            <path d="M5 10v8c0 1.1.9 2 2 2h2v3h6v-3h2c1.1 0 2-.9 2-2v-8H5z"/>
            <circle cx="12" cy="14" r="1.5"/>
          </svg>
        )
      case 'workbench':
        return (
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
            <rect x="3" y="8" width="18" height="8" rx="1"/>
            <path d="M5 16v4M19 16v4M9 8V4M15 8V4"/>
          </svg>
        )
      case 'computer':
        return (
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
            <rect x="3" y="4" width="18" height="12" rx="1"/>
            <path d="M8 21h8M12 17v4"/>
          </svg>
        )
      case 'printer':
        return (
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
            <rect x="4" y="4" width="16" height="16" rx="2"/>
            <path d="M8 8h8M8 12h6M8 16h4"/>
          </svg>
        )

      default:
        return (
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="8"/>
          </svg>
        )
    }
  }

  return (
    <div className="relative w-full h-96 md:h-[500px] bg-gradient-to-br from-slate-900/50 to-slate-800/50 backdrop-blur-sm border border-slate-600/30 rounded-xl overflow-hidden shadow-2xl">
      <svg
        viewBox="0 0 660 440"
        className="w-full h-full"
        style={{ background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 41, 59, 0.9) 100%)' }}
      >
        {/* Zone backgrounds */}
        {Object.entries(ZONES).map(([key, zone]) => (
          <g key={key}>
            {/* Zone background with gradient and glow effects */}
            <defs>
              <linearGradient id={`gradient-${key}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: zone.bookable ? 'rgba(59, 130, 246, 0.15)' : 'rgba(71, 85, 105, 0.1)', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: zone.bookable ? 'rgba(147, 51, 234, 0.1)' : 'rgba(51, 65, 85, 0.1)', stopOpacity: 1 }} />
              </linearGradient>
              {zone.bookable && (
                <filter id={`glow-${key}`} x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge> 
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              )}
            </defs>
            
            <rect
              x={zone.x}
              y={zone.y}
              width={zone.width}
              height={zone.height}
              fill={`url(#gradient-${key})`}
              stroke={zone.bookable ? 'rgba(59, 130, 246, 0.3)' : 'rgba(71, 85, 105, 0.2)'}
              strokeWidth="1"
              rx="12"
              filter={zone.bookable ? `url(#glow-${key})` : undefined}
              className="transition-all duration-300"
            />
            
            {/* Zone label with better typography */}
            <text
              x={zone.x + zone.width / 2}
              y={zone.y + zone.height / 2}
              textAnchor="middle"
              className={`${zone.bookable ? 'fill-slate-200' : 'fill-slate-500'} font-semibold tracking-wide`}
              style={{ 
                fontSize: '13px',
                textShadow: zone.bookable ? '0 1px 2px rgba(0,0,0,0.5)' : undefined
              }}
            >
              {zone.name}
            </text>
            
            {/* Zone seats (only for bookable zones) */}
            {zone.bookable && zone.seats && zone.seats.map((seat) => {
              const status = getSeatStatus(seat.id)
              const seatFill = status === 'selected' ? 'rgba(59, 130, 246, 0.9)' : 
                              status === 'occupied' ? 'rgba(239, 68, 68, 0.8)' : 
                              'rgba(34, 197, 94, 0.8)'
              const seatStroke = status === 'selected' ? 'rgba(59, 130, 246, 1)' : 
                                status === 'occupied' ? 'rgba(239, 68, 68, 1)' : 
                                'rgba(34, 197, 94, 1)'
              
              return (
                <g key={seat.id}>
                  {/* Seat glow effect */}
                  <defs>
                    <filter id={`seat-glow-${seat.id}`} x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                      <feMerge> 
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  
                  <rect
                    x={seat.x - 8}
                    y={seat.y - 8}
                    width="16"
                    height="16"
                    rx="4"
                    fill={seatFill}
                    stroke={seatStroke}
                    strokeWidth="2"
                    filter={`url(#seat-glow-${seat.id})`}
                    className={`cursor-pointer transition-all duration-300 hover:brightness-125 hover:saturate-110 ${
                      disabled ? 'cursor-not-allowed opacity-50' : ''
                    }`}
                    onClick={() => handleSeatClick(seat.id)}
                    onMouseEnter={() => setHoveredSeat(seat)}
                    onMouseLeave={() => setHoveredSeat(null)}
                  />
                  
                  {/* Seat icon */}
                  <foreignObject
                    x={seat.x - 6}
                    y={seat.y - 6}
                    width="12"
                    height="12"
                    className="pointer-events-none"
                  >
                    <div className="w-full h-full flex items-center justify-center text-white drop-shadow-sm">
                      {getSeatIcon(seat.type)}
                    </div>
                  </foreignObject>
                </g>
              )
            })}
          </g>
        ))}

        {/* Workstation Clusters (cross-shaped tables) */}
        {WORKSTATION_CLUSTERS.map((cluster) => (
          <g key={cluster.id}>
            {/* Professional table design */}
            <defs>
              <linearGradient id={`table-gradient-${cluster.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: 'rgba(139, 69, 19, 0.9)', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: 'rgba(101, 67, 33, 1)', stopOpacity: 1 }} />
              </linearGradient>
              <filter id={`table-shadow-${cluster.id}`} x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow dx="2" dy="2" stdDeviation="3" floodColor="rgba(0,0,0,0.4)"/>
              </filter>
            </defs>
            
            {/* Table surface (wooden brown) */}
            <rect
              x={cluster.x - 15}
              y={cluster.y - 15}
              width="30"
              height="30"
              fill={`url(#table-gradient-${cluster.id})`}
              stroke="rgba(101, 67, 33, 1)"
              strokeWidth="2"
              rx="4"
              filter={`url(#table-shadow-${cluster.id})`}
              className="transition-all duration-300"
            />
            
            {/* Table legs (4 corners) */}
            <rect x={cluster.x - 13} y={cluster.y - 13} width="3" height="3" fill="rgba(69, 39, 19, 1)" rx="1"/>
            <rect x={cluster.x + 10} y={cluster.y - 13} width="3" height="3" fill="rgba(69, 39, 19, 1)" rx="1"/>
            <rect x={cluster.x - 13} y={cluster.y + 10} width="3" height="3" fill="rgba(69, 39, 19, 1)" rx="1"/>
            <rect x={cluster.x + 10} y={cluster.y + 10} width="3" height="3" fill="rgba(69, 39, 19, 1)" rx="1"/>
            
            {/* Table surface wood grain effect */}
            <rect
              x={cluster.x - 12}
              y={cluster.y - 12}
              width="24"
              height="24"
              fill="rgba(160, 82, 45, 0.3)"
              rx="3"
              className="pointer-events-none"
            />
            <rect
              x={cluster.x - 10}
              y={cluster.y - 2}
              width="20"
              height="1"
              fill="rgba(101, 67, 33, 0.4)"
              className="pointer-events-none"
            />
            <rect
              x={cluster.x - 10}
              y={cluster.y + 2}
              width="20"
              height="1"
              fill="rgba(101, 67, 33, 0.4)"
              className="pointer-events-none"
            />
            
            {/* Professional workstation chairs around the table */}
            {cluster.seats.map((seatId, index) => {
              const positions = [
                { x: cluster.x, y: cluster.y - 25 }, // top
                { x: cluster.x + 25, y: cluster.y }, // right
                { x: cluster.x, y: cluster.y + 25 }, // bottom
                { x: cluster.x - 25, y: cluster.y }, // left
              ]
              const pos = positions[index]
              const status = getSeatStatus(seatId)
              const seatFill = status === 'selected' ? 'rgba(59, 130, 246, 0.9)' : 
                              status === 'occupied' ? 'rgba(239, 68, 68, 0.8)' : 
                              'rgba(34, 197, 94, 0.8)'
              const seatStroke = status === 'selected' ? 'rgba(59, 130, 246, 1)' : 
                                status === 'occupied' ? 'rgba(239, 68, 68, 1)' : 
                                'rgba(34, 197, 94, 1)'
              
              return (
                <g key={seatId}>
                  {/* Chair shadow/base */}
                  <ellipse
                    cx={pos.x}
                    cy={pos.y + 1}
                    rx="8"
                    ry="3"
                    fill="rgba(0, 0, 0, 0.2)"
                    className="pointer-events-none"
                  />
                  
                  {/* Chair glow effect */}
                  <defs>
                    <filter id={`workstation-glow-${seatId}`} x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                      <feMerge> 
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  
                  {/* Main chair seat - same colors as zone chairs */}
                  <rect
                    x={pos.x - 7}
                    y={pos.y - 7}
                    width="14"
                    height="14"
                    rx="2"
                    fill={seatFill}
                    stroke={seatStroke}
                    strokeWidth="2"
                    filter={`url(#workstation-glow-${seatId})`}
                    className={`cursor-pointer transition-all duration-300 hover:brightness-125 hover:saturate-110 ${
                      disabled ? 'cursor-not-allowed opacity-50' : ''
                    }`}
                    onClick={() => handleSeatClick(seatId)}
                    onMouseEnter={() => setHoveredSeat({ id: seatId, name: `Workstation ${seatId.split('-')[0]}`, type: 'chair' })}
                    onMouseLeave={() => setHoveredSeat(null)}
                  />
                  
                  {/* Chair icon - same as all other chairs */}
                  <foreignObject
                    x={pos.x - 5}
                    y={pos.y - 5}
                    width="10"
                    height="10"
                    className="pointer-events-none"
                  >
                    <div className="w-full h-full flex items-center justify-center text-white drop-shadow-sm">
                      {getSeatIcon('chair')}
                    </div>
                  </foreignObject>
                </g>
              )
            })}
          </g>
        ))}
      </svg>

      {/* Tooltip */}
      {hoveredSeat && (
        <div className="absolute bottom-4 left-4 bg-slate-800/95 border border-slate-600/50 rounded-lg p-3 pointer-events-none">
          <div className="text-slate-200 font-medium text-sm">{hoveredSeat.name}</div>
          <div className="text-slate-400 text-xs capitalize">{hoveredSeat.type}</div>
          <div className={`text-xs mt-1 ${
            getSeatStatus(hoveredSeat.id) === 'available' ? 'text-green-400' :
            getSeatStatus(hoveredSeat.id) === 'selected' ? 'text-blue-400' : 'text-red-400'
          }`}>
            {getSeatStatus(hoveredSeat.id) === 'available' ? 'Available' :
             getSeatStatus(hoveredSeat.id) === 'selected' ? 'Selected' : 'Occupied'}
          </div>
        </div>
      )}
    </div>
  )
}

export default FloorPlan