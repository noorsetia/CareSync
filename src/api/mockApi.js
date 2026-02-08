// Lightweight mock API for local development and demos.
// Intentionally simple — simulates latency, errors, and returns predictable shapes.

function delay(ms) {
  return new Promise((res) => setTimeout(res, ms))
}

// Mock user database (in-memory). In real apps this would be server-side.
const users = [
  { id: 'u1', email: 'patient@example.com', password: 'password123', name: 'Alex Patient' },
]

export async function login({ email, password }) {
  // Simulate network latency and a chance of transient error
  await delay(600 + Math.random() * 400)

  const found = users.find((u) => u.email.toLowerCase() === email.toLowerCase())
  if (!found || found.password !== password) {
    const err = new Error('Invalid email or password')
    err.status = 401
    throw err
  }

  // Return a fake token and a minimal user object (omit sensitive fields)
  return {
    token: `mock-token-${found.id}-${Date.now()}`,
    user: { id: found.id, email: found.email, name: found.name },
  }
}

export async function fetchPatientData({ token }) {
  // token isn't verified here — in a real app the server would verify it
  await delay(400 + Math.random() * 400)

  // Use token in a non-sensitive way for debugging in dev only.
  if (token) console.debug('mockApi: received token (truncated) =', String(token).slice(0, 12))

  // simulate occasional server error
  if (Math.random() < 0.05) {
    const err = new Error('Server error fetching patient data')
    err.status = 502
    throw err
  }

  // Return a small, privacy-conscious patient object
  return {
    id: 'p1',
    name: 'Alex Patient',
    dateOfBirth: '1985-07-12',
    lastVisit: '2025-10-01',
    medications: [
      { id: 'm1', name: 'Atorvastatin', dose: '10mg', frequency: 'Once daily' },
      { id: 'm2', name: 'Lisinopril', dose: '5mg', frequency: 'Once daily' },
    ],
    // In production, PHI handling must follow HIPAA and other rules.
  }
}

// Mock doctors database
const doctors = [
  { 
    id: 'd1', 
    name: 'Dr. Sarah Johnson', 
    specialty: 'Cardiology',
    location: 'Downtown Medical Center',
    rating: 4.8,
    experience: '15 years',
    availability: ['2026-02-10', '2026-02-12', '2026-02-15'],
    image: '👨‍⚕️',
    fees: '$150'
  },
  { 
    id: 'd2', 
    name: 'Dr. Michael Chen', 
    specialty: 'Dermatology',
    location: 'Northside Clinic',
    rating: 4.9,
    experience: '12 years',
    availability: ['2026-02-11', '2026-02-13', '2026-02-16'],
    image: '👩‍⚕️',
    fees: '$120'
  },
  { 
    id: 'd3', 
    name: 'Dr. Emily Rodriguez', 
    specialty: 'Pediatrics',
    location: 'Children\'s Health Center',
    rating: 4.7,
    experience: '10 years',
    availability: ['2026-02-09', '2026-02-11', '2026-02-14'],
    image: '👨‍⚕️',
    fees: '$100'
  },
  { 
    id: 'd4', 
    name: 'Dr. James Wilson', 
    specialty: 'Orthopedics',
    location: 'Sports Medicine Institute',
    rating: 4.6,
    experience: '18 years',
    availability: ['2026-02-10', '2026-02-13', '2026-02-17'],
    image: '👩‍⚕️',
    fees: '$180'
  },
  { 
    id: 'd5', 
    name: 'Dr. Lisa Anderson', 
    specialty: 'Neurology',
    location: 'Brain & Spine Center',
    rating: 4.9,
    experience: '20 years',
    availability: ['2026-02-12', '2026-02-14', '2026-02-18'],
    image: '👨‍⚕️',
    fees: '$200'
  },
]

// Mock appointments database
const appointments = [
  {
    id: 'apt1',
    doctorId: 'd1',
    doctorName: 'Dr. Sarah Johnson',
    specialty: 'Cardiology',
    date: '2026-02-12',
    time: '10:00 AM',
    location: 'Downtown Medical Center',
    status: 'upcoming',
    type: 'Follow-up',
    notes: 'Annual heart checkup'
  },
  {
    id: 'apt2',
    doctorId: 'd3',
    doctorName: 'Dr. Emily Rodriguez',
    specialty: 'Pediatrics',
    date: '2026-02-15',
    time: '2:30 PM',
    location: 'Children\'s Health Center',
    status: 'upcoming',
    type: 'Consultation',
    notes: 'Regular wellness visit'
  },
  {
    id: 'apt3',
    doctorId: 'd2',
    doctorName: 'Dr. Michael Chen',
    specialty: 'Dermatology',
    date: '2026-01-20',
    time: '11:00 AM',
    location: 'Northside Clinic',
    status: 'completed',
    type: 'Treatment',
    notes: 'Skin condition follow-up'
  },
]

// Mock medical records database
const medicalRecords = [
  {
    id: 'rec1',
    type: 'Lab Result',
    title: 'Complete Blood Count (CBC)',
    date: '2026-01-28',
    doctor: 'Dr. Sarah Johnson',
    category: 'lab',
    results: [
      { test: 'White Blood Cells', value: '7.5', unit: 'K/uL', range: '4.5-11.0', status: 'normal' },
      { test: 'Red Blood Cells', value: '5.2', unit: 'M/uL', range: '4.7-6.1', status: 'normal' },
      { test: 'Hemoglobin', value: '15.2', unit: 'g/dL', range: '14.0-18.0', status: 'normal' },
      { test: 'Platelets', value: '250', unit: 'K/uL', range: '150-400', status: 'normal' },
    ]
  },
  {
    id: 'rec2',
    type: 'Vital Signs',
    title: 'Blood Pressure & Vitals Check',
    date: '2026-02-02',
    doctor: 'Dr. Sarah Johnson',
    category: 'vitals',
    vitals: [
      { metric: 'Blood Pressure', value: '118/76', unit: 'mmHg', status: 'normal' },
      { metric: 'Heart Rate', value: '72', unit: 'bpm', status: 'normal' },
      { metric: 'Temperature', value: '98.4', unit: '°F', status: 'normal' },
      { metric: 'Oxygen Saturation', value: '98', unit: '%', status: 'normal' },
    ]
  },
  {
    id: 'rec3',
    type: 'Lab Result',
    title: 'Lipid Panel',
    date: '2026-01-15',
    doctor: 'Dr. Sarah Johnson',
    category: 'lab',
    results: [
      { test: 'Total Cholesterol', value: '185', unit: 'mg/dL', range: '<200', status: 'normal' },
      { test: 'LDL Cholesterol', value: '110', unit: 'mg/dL', range: '<100', status: 'borderline' },
      { test: 'HDL Cholesterol', value: '55', unit: 'mg/dL', range: '>40', status: 'normal' },
      { test: 'Triglycerides', value: '100', unit: 'mg/dL', range: '<150', status: 'normal' },
    ]
  },
]

// Health tips database
const healthTips = [
  {
    id: 'tip1',
    category: 'Exercise',
    title: 'Stay Active Daily',
    tip: 'Aim for at least 30 minutes of moderate exercise most days of the week.',
    icon: '🏃'
  },
  {
    id: 'tip2',
    category: 'Nutrition',
    title: 'Eat More Vegetables',
    tip: 'Include a variety of colorful vegetables in your meals for essential nutrients.',
    icon: '🥗'
  },
  {
    id: 'tip3',
    category: 'Sleep',
    title: 'Prioritize Sleep',
    tip: 'Aim for 7-9 hours of quality sleep each night for optimal health.',
    icon: '😴'
  },
  {
    id: 'tip4',
    category: 'Hydration',
    title: 'Stay Hydrated',
    tip: 'Drink at least 8 glasses of water daily to keep your body functioning well.',
    icon: '💧'
  },
]

export async function searchDoctors({ specialty, location } = {}) {
  await delay(500 + Math.random() * 300)
  
  let filtered = [...doctors]
  
  if (specialty && specialty !== 'all') {
    filtered = filtered.filter(d => d.specialty === specialty)
  }
  
  if (location && location !== 'all') {
    filtered = filtered.filter(d => d.location === location)
  }
  
  return filtered
}

export async function fetchAppointments({ token, status } = {}) {
  await delay(400 + Math.random() * 300)
  
  if (!token) {
    throw new Error('Unauthorized')
  }
  
  let filtered = [...appointments]
  
  if (status === 'upcoming') {
    filtered = filtered.filter(a => a.status === 'upcoming')
  } else if (status === 'past') {
    filtered = filtered.filter(a => a.status === 'completed')
  }
  
  // Sort by date
  filtered.sort((a, b) => new Date(b.date) - new Date(a.date))
  
  return filtered
}

export async function bookAppointment({ token, doctorId, date, time, type, notes }) {
  await delay(600 + Math.random() * 400)
  
  if (!token) {
    throw new Error('Unauthorized')
  }
  
  const doctor = doctors.find(d => d.id === doctorId)
  if (!doctor) {
    throw new Error('Doctor not found')
  }
  
  // Create new appointment
  const newAppointment = {
    id: `apt${Date.now()}`,
    doctorId,
    doctorName: doctor.name,
    specialty: doctor.specialty,
    date,
    time,
    location: doctor.location,
    status: 'upcoming',
    type,
    notes
  }
  
  appointments.push(newAppointment)
  
  return newAppointment
}

export async function fetchMedicalRecords({ token, category } = {}) {
  await delay(400 + Math.random() * 300)
  
  if (!token) {
    throw new Error('Unauthorized')
  }
  
  let filtered = [...medicalRecords]
  
  if (category && category !== 'all') {
    filtered = filtered.filter(r => r.category === category)
  }
  
  // Sort by date (newest first)
  filtered.sort((a, b) => new Date(b.date) - new Date(a.date))
  
  return filtered
}

export async function fetchHealthTips() {
  await delay(300)
  return healthTips
}

export async function fetchDoctorDetails(doctorId) {
  await delay(300)
  const doctor = doctors.find(d => d.id === doctorId)
  if (!doctor) {
    throw new Error('Doctor not found')
  }
  return doctor
}
