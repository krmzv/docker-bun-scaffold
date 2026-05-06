import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import type { CreateNoteInput } from '../lib/schema'
import { notesQueryKey } from './useNotes'

export function useCreateNote() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateNoteInput) => api.createNote(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: notesQueryKey }),
  })
}
