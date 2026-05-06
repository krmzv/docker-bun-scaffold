import { useNotes } from '../hooks/useNotes'

export function NoteList() {
  const { data: notes, isPending, isError } = useNotes()

  if (isPending) return <p className="state">Loading…</p>
  if (isError) return <p className="state state--error">Failed to load notes.</p>
  if (!notes.length) return <p className="state">No notes yet.</p>

  return (
    <ul className="note-list">
      {notes.map((note) => (
        <li key={note.id} className="note-card">
          <h3 className="note-card__title">{note.title}</h3>
          <p className="note-card__content">{note.content}</p>
          <time className="note-card__time">{new Date(note.createdAt).toLocaleString()}</time>
        </li>
      ))}
    </ul>
  )
}
