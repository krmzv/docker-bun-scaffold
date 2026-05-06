import Fastify, { type FastifyError } from 'fastify'
import cors from '@fastify/cors'
import { noteRoutes } from './routes/notes'
import { ZodError } from 'zod'

const app = Fastify({ logger: true })

await app.register(cors, { origin: process.env.CORS_ORIGIN ?? '*' })
await app.register(noteRoutes, { prefix: '/api' })

app.get('/health', async () => ({ ok: true }))

app.setErrorHandler((err: FastifyError, _req, reply) => {
	app.log.error(err)

	if (err instanceof ZodError) {
		return reply
			.code(400)
			.send({ error: 'Validation failed', details: JSON.parse(err.message) })
	}

	return reply.code(err.statusCode ?? 500).send({ error: err.message })
})

const port = Number(process.env.PORT ?? 3000)

app.listen({ port, host: '0.0.0.0' }).catch((err) => {
	app.log.error(err)
	process.exit(1)
})
