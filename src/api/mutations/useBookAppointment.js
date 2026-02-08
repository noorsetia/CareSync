import { useMutation, useQueryClient } from '@tanstack/react-query'

/**
 * useBookAppointment - React Query mutation for booking appointments
 * 
 * Purpose:
 * - Handles appointment booking API call
 * - Automatically invalidates and refetches appointments list
 * - Provides loading and error states for UI feedback
 * 
 * @param {string} token - Auth token
 * @returns {Object} { mutate, mutateAsync, isLoading, error, data }
 * 
 * Example:
 * const { mutate: bookAppointment, isLoading } = useBookAppointment(token)
 * 
 * bookAppointment(
 *   { doctorId: '123', date: '2026-03-01', time: '10:00' },
 *   {
 *     onSuccess: () => toast.success('Appointment booked!'),
 *     onError: (err) => toast.error(err.message)
 *   }
 * )
 */
export function useBookAppointment(token) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (appointmentData) => {
      // Mock API call - replace with real endpoint
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(appointmentData),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to book appointment')
      }

      return response.json()
    },
    onSuccess: () => {
      // Invalidate appointments query to trigger refetch
      queryClient.invalidateQueries({ queryKey: ['appointments'] })
    },
  })
}
