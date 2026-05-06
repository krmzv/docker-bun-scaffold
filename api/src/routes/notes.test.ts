import { describe, test, expect } from 'bun:test'
import { createBody, noteParams } from './notes'

describe('createBody schema', () => {
	test('accepts valid input', () => {
		const result = createBody.safeParse({ title: 'Hello', content: 'World' })
		expect(result.success).toBe(true)
	})

	test('rejects empty title', () => {
		const result = createBody.safeParse({ title: '', content: 'World' })
		expect(result.success).toBe(false)
	})

	test('rejects missing content', () => {
		const result = createBody.safeParse({ title: 'Hello' })
		expect(result.success).toBe(false)
	})

	test('rejects title over 200 chars', () => {
		const result = createBody.safeParse({ title: 'a'.repeat(201), content: 'x' })
		expect(result.success).toBe(false)
	})
})

describe('noteParams schema', () => {
	test('accepts valid UUID', () => {
		const result = noteParams.safeParse({ id: '550e8400-e29b-41d4-a716-446655440000' })
		expect(result.success).toBe(true)
	})

	test('rejects non-UUID string', () => {
		const result = noteParams.safeParse({ id: 'not-a-uuid' })
		expect(result.success).toBe(false)
	})

	test('rejects missing id', () => {
		const result = noteParams.safeParse({})
		expect(result.success).toBe(false)
	})
})
