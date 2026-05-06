import { eq } from 'drizzle-orm'
import { db } from '../../db/client'
import { notes } from '../../db/schema'

export async function getNoteById(id: string) {
	const [note] = await db.select().from(notes).where(eq(notes.id, id)).limit(1)
	return note ?? null
}
