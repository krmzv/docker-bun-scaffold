import { z } from 'zod'

export const NoteSchema = z.object({
	id: z.uuid(),
	title: z.string(),
	content: z.string(),
	createdAt: z.string(),
})

export const NotesSchema = z.array(NoteSchema)

export const CreateNoteSchema = z.object({
	title: z.string().min(1, 'Title is required').max(200),
	content: z.string().min(1, 'Content is required').max(100_000),
})

export type Note = z.infer<typeof NoteSchema>
export type CreateNoteInput = z.infer<typeof CreateNoteSchema>
