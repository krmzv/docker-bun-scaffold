import type { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { createNote } from '../services/notes/create'
import { getAllNotes } from '../services/notes/get-all'
import { getNoteById } from '../services/notes/get'

export const createBody = z.object({
	title: z.string().min(1).max(200),
	content: z.string().min(1).max(100_000),
})

export const noteParams = z.object({
	id: z.string().uuid(),
})

export async function noteRoutes(app: FastifyInstance) {
	app.post('/notes', async (req, reply) => {
		const body = createBody.parse(req.body)
		const note = await createNote(body)
		return reply.code(201).send(note)
	})

	app.get('/notes', async () => {
		return getAllNotes()
	})

	app.get('/notes/:id', async (req, reply) => {
		const { id } = noteParams.parse(req.params)
		const note = await getNoteById(id)
		if (!note) return reply.code(404).send({ error: 'Not found' })
		return note
	})
}
