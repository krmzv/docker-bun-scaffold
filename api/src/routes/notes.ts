import type { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { eq, desc } from 'drizzle-orm'
import { db } from '../db/client'
import { notes } from '../db/schema'

export const createBody = z.object({
	title: z.string().min(1).max(200),
	content: z.string().min(1).max(100_000),
})

export const noteParams = z.object({
	id: z.string().uuid(),
})

export async function noteRoutes(app: FastifyInstance) {
	// POST /notes
	app.post('/notes', async (req, reply) => {
		const body = createBody.parse(req.body)
		const [note] = await db.insert(notes).values(body).returning()
		return reply.code(201).send(note)
	})

	// GET /notes
	app.get('/notes', async () => {
		return db.select().from(notes).orderBy(desc(notes.createdAt)).limit(50)
	})

	// GET /notes/:id
	app.get('/notes/:id', async (req, reply) => {
		const { id } = noteParams.parse(req.params)

		const [note] = await db
			.select()
			.from(notes)
			.where(eq(notes.id, id))
			.limit(1)

		if (!note) return reply.code(404).send({ error: 'Not found' })
		return note
	})
}
