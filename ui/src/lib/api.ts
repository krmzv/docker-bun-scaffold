import { NotesSchema, NoteSchema, type CreateNoteInput } from './schema'
import { throwIfNotOk } from './error'

const BASE = import.meta.env.VITE_API_URL ?? 'http://api:3000/api'

export const api = {
	async getNotes() {
		const res = await fetch(`${BASE}/notes`, {
			headers: { 'Content-Type': 'application/json' },
		})

		if (!res.ok) throwIfNotOk(res, await res.text().catch(() => ''))

		return NotesSchema.parse(await res.json())
	},

	async createNote(data: CreateNoteInput) {
		const res = await fetch(`${BASE}/notes`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data),
		})

		if (!res.ok) throwIfNotOk(res, await res.text().catch(() => ''))

		return NoteSchema.parse(await res.json())
	},
}
