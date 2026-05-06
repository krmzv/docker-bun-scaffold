import { useState } from 'react'
import { z } from 'zod'
import { CreateNoteSchema, type CreateNoteInput } from '../lib/schema'
import { useCreateNote } from '../hooks/useCreateNote'

export function NoteForm() {
	const [fields, setFields] = useState<CreateNoteInput>({
		title: '',
		content: '',
	})
	const [errors, setErrors] = useState<Partial<CreateNoteInput>>({})
	const { mutate, isPending, isError, error } = useCreateNote()

	function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
		e.preventDefault()

		const result = CreateNoteSchema.safeParse(fields)
		if (!result.success) {
			const flat = z.flattenError(result.error).fieldErrors
			setErrors({
				title: flat.title?.[0],
				content: flat.content?.[0],
			})
			return
		}

		setErrors({})
		mutate(result.data, {
			onSuccess: () => setFields({ title: '', content: '' }),
		})
	}

	return (
		<form onSubmit={handleSubmit} className="note-form">
			<h2 className="note-form__title">New note</h2>
			<div className="note-form__field">
				<label className="note-form__label" htmlFor="title">
					Title
				</label>
				<input
					className="note-form__input"
					id="title"
					type="text"
					value={fields.title}
					onChange={(e) => setFields((f) => ({ ...f, title: e.target.value }))}
					placeholder="Note title"
				/>
				{errors.title && (
					<span className="note-form__error">{errors.title}</span>
				)}
			</div>
			<div className="note-form__field">
				<label className="note-form__label" htmlFor="content">
					Content
				</label>
				<textarea
					className="note-form__textarea"
					id="content"
					value={fields.content}
					onChange={(e) =>
						setFields((f) => ({ ...f, content: e.target.value }))
					}
					placeholder="Write something..."
					rows={4}
				/>
				{errors.content && (
					<span className="note-form__error">{errors.content}</span>
				)}
			</div>
			{isError && <span className="note-form__error">{error.message}</span>}
			<button className="note-form__submit" type="submit" disabled={isPending}>
				{isPending ? 'Saving…' : 'Add note'}
			</button>
		</form>
	)
}
