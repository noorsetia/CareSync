import { useQuery } from '@tanstack/react-query'
import * as mockApi from '../mockApi'

/**
 * usePatientData - React Query hook for fetching patient data
 * 
 * Purpose:
 * - Encapsulates patient data fetching logic
 * - Provides loading, error, and data states
 * - Automatically caches and refetches based on React Query config
 * 
 * @param {string} token - Auth token
 * @param {string} userId - User ID
 * @returns {Object} { data, error, isLoading, isFetching, refetch }
 * 
 * Example:
 * const { data: patient, isLoading } = usePatientData(token, userId)
 */
export function usePatientData(token, userId) {
  return useQuery({
    queryKey: ['patientData', userId],
    queryFn: () => mockApi.fetchPatientData({ token }),
    enabled: !!token && !!userId,
    retry: 1,
    staleTime: 1000 * 60 * 1, // 1 minute
  })
}
