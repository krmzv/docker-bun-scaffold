import { useQuery } from '@tanstack/react-query'
import { api } from '../lib/api'

export const notesQueryKey = ['notes'] as const

export function useNotes() {
  return useQuery({
    queryKey: notesQueryKey,
    queryFn: api.getNotes,
  })
}
