import { useQuery } from '@tanstack/react-query'

/**
 * useAppointments - React Query hook for fetching appointments
 * 
 * Purpose:
 * - Fetches list of patient appointments
 * - Supports filtering by status (upcoming, past, cancelled)
 * - Automatically refetches on window focus
 * 
 * @param {string} token - Auth token
 * @param {Object} filters - Filter options { status: 'upcoming' | 'past' | 'all' }
 * @returns {Object} { data, error, isLoading, refetch }
 * 
 * Example:
 * const { data: appointments } = useAppointments(token, { status: 'upcoming' })
 */
export function useAppointments(token, filters = {}) {
  return useQuery({
    queryKey: ['appointments', filters],
    queryFn: async () => {
      // Mock API call - replace with real endpoint
      const response = await fetch('/api/appointments', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return response.json()
    },
    enabled: !!token,
    staleTime: 1000 * 30, // 30 seconds - appointments change frequently
  })
}
