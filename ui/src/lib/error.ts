export class ApiError extends Error {
	status: number

	constructor(message: string, status: number) {
		super(message)
		this.name = 'ApiError'
		this.status = status
	}
}

export function isApiError(err: unknown): err is ApiError {
	return err instanceof ApiError
}

export function throwIfNotOk(res: Response, text: string): never {
	const message = tryParseErrorMessage(text) ?? `HTTP ${res.status}`
	throw new ApiError(message, res.status)
}

function tryParseErrorMessage(text: string): string | undefined {
	try {
		const json = JSON.parse(text)
		if (typeof json.error === 'string') return json.error
	} catch {}
}
