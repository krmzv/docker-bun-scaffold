import { describe, test, expect } from 'vitest'
import { ApiError, isApiError, throwIfNotOk } from './error'

describe('ApiError', () => {
	test('constructs with message and status', () => {
		const err = new ApiError('Not found', 404)
		expect(err.message).toBe('Not found')
		expect(err.status).toBe(404)
		expect(err.name).toBe('ApiError')
	})

	test('is an instance of Error', () => {
		const err = new ApiError('fail', 500)
		expect(err).toBeInstanceOf(Error)
	})
})

describe('isApiError', () => {
	test('returns true for ApiError instances', () => {
		expect(isApiError(new ApiError('x', 400))).toBe(true)
	})

	test('returns false for plain Error', () => {
		expect(isApiError(new Error('x'))).toBe(false)
	})

	test('returns false for non-error values', () => {
		expect(isApiError(null)).toBe(false)
		expect(isApiError('string')).toBe(false)
	})
})

describe('throwIfNotOk', () => {
	test('throws ApiError with parsed JSON error message', () => {
		const res = { status: 422 } as Response
		expect(() => throwIfNotOk(res, '{"error":"Validation failed"}')).toThrow(ApiError)
		expect(() => throwIfNotOk(res, '{"error":"Validation failed"}')).toThrow('Validation failed')
	})

	test('falls back to HTTP status when JSON has no error field', () => {
		const res = { status: 500 } as Response
		expect(() => throwIfNotOk(res, '{}')).toThrow('HTTP 500')
	})

	test('falls back to HTTP status when body is not JSON', () => {
		const res = { status: 403 } as Response
		expect(() => throwIfNotOk(res, 'not json')).toThrow('HTTP 403')
	})
})
