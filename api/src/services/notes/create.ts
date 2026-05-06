import { db } from '../../db/client'
import { notes } from '../../db/schema'

export async function createNote(data: { title: string; content: string }) {
	const [note] = await db.insert(notes).values(data).returning()
	return note
}
