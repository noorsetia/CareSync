/**
 * Notification Service - Simulates Email/SMS notifications
 * 
 * Features:
 * - Email notification simulation
 * - SMS notification simulation
 * - Appointment reminders
 * - Lab results notifications
 * - Success/error handling
 */

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

/**
 * Simulate sending an email notification
 */
export async function sendEmailNotification({ to, subject, body, type = 'info' }) {
  console.log('📧 Sending Email Notification...')
  console.log('To:', to)
  console.log('Subject:', subject)
  console.log('Body:', body)
  console.log('Type:', type)
  
  // Simulate network delay
  await delay(800)
  
  // Simulate 95% success rate
  if (Math.random() > 0.05) {
    console.log('✅ Email sent successfully!')
    return {
      success: true,
      messageId: `email-${Date.now()}`,
      timestamp: new Date().toISOString(),
      message: `Email sent to ${to}`
    }
  } else {
    console.log('❌ Email failed to send')
    throw new Error('Failed to send email notification')
  }
}

/**
 * Simulate sending an SMS notification
 */
export async function sendSMSNotification({ to, message, type = 'info' }) {
  console.log('📱 Sending SMS Notification...')
  console.log('To:', to)
  console.log('Message:', message)
  console.log('Type:', type)
  
  // Simulate network delay
  await delay(600)
  
  // Simulate 95% success rate
  if (Math.random() > 0.05) {
    console.log('✅ SMS sent successfully!')
    return {
      success: true,
      messageId: `sms-${Date.now()}`,
      timestamp: new Date().toISOString(),
      message: `SMS sent to ${to}`
    }
  } else {
    console.log('❌ SMS failed to send')
    throw new Error('Failed to send SMS notification')
  }
}

/**
 * Send appointment confirmation notification
 */
export async function sendAppointmentConfirmation({ appointment, email, phone }) {
  const emailPromise = sendEmailNotification({
    to: email,
    subject: 'Appointment Confirmation',
    body: `Your appointment with ${appointment.doctorName} on ${appointment.date} at ${appointment.time} has been confirmed.`,
    type: 'appointment'
  })

  const smsPromise = sendSMSNotification({
    to: phone,
    message: `Appointment confirmed: ${appointment.doctorName}, ${appointment.date} at ${appointment.time}`,
    type: 'appointment'
  })

  try {
    const [emailResult, smsResult] = await Promise.all([emailPromise, smsPromise])
    return {
      success: true,
      email: emailResult,
      sms: smsResult
    }
  } catch (error) {
    console.error('Notification error:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

/**
 * Send appointment reminder (24 hours before)
 */
export async function sendAppointmentReminder({ appointment, email, phone }) {
  const emailPromise = sendEmailNotification({
    to: email,
    subject: 'Appointment Reminder - Tomorrow',
    body: `Reminder: You have an appointment with ${appointment.doctorName} tomorrow at ${appointment.time}. Location: ${appointment.location}`,
    type: 'reminder'
  })

  const smsPromise = sendSMSNotification({
    to: phone,
    message: `Reminder: Appointment tomorrow with ${appointment.doctorName} at ${appointment.time}`,
    type: 'reminder'
  })

  try {
    const [emailResult, smsResult] = await Promise.all([emailPromise, smsPromise])
    return {
      success: true,
      email: emailResult,
      sms: smsResult
    }
  } catch (error) {
    console.error('Reminder error:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

/**
 * Send lab results notification
 */
export async function sendLabResultsNotification({ email, phone, testName }) {
  const emailPromise = sendEmailNotification({
    to: email,
    subject: 'Lab Results Available',
    body: `Your ${testName} results are now available. Please log in to your patient portal to view them.`,
    type: 'results'
  })

  const smsPromise = sendSMSNotification({
    to: phone,
    message: `Your ${testName} results are available. Check your patient portal.`,
    type: 'results'
  })

  try {
    const [emailResult, smsResult] = await Promise.all([emailPromise, smsPromise])
    return {
      success: true,
      email: emailResult,
      sms: smsResult
    }
  } catch (error) {
    console.error('Lab results notification error:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

/**
 * Send appointment cancellation notification
 */
export async function sendCancellationNotification({ appointment, email, phone }) {
  const emailPromise = sendEmailNotification({
    to: email,
    subject: 'Appointment Cancelled',
    body: `Your appointment with ${appointment.doctorName} on ${appointment.date} at ${appointment.time} has been cancelled.`,
    type: 'cancellation'
  })

  const smsPromise = sendSMSNotification({
    to: phone,
    message: `Appointment cancelled: ${appointment.doctorName}, ${appointment.date}`,
    type: 'cancellation'
  })

  try {
    const [emailResult, smsResult] = await Promise.all([emailPromise, smsPromise])
    return {
      success: true,
      email: emailResult,
      sms: smsResult
    }
  } catch (error) {
    console.error('Cancellation notification error:', error)
    return {
      success: false,
      error: error.message
    }
  }
}
