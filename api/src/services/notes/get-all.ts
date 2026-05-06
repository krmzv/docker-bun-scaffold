import { desc } from 'drizzle-orm'
import { db } from '../../db/client'
import { notes } from '../../db/schema'

export async function getAllNotes() {
	return db.select().from(notes).orderBy(desc(notes.createdAt)).limit(50)
}
