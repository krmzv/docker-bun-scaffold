import { NoteForm } from './components/NoteForm'
import { NoteList } from './components/NoteList'

export default function App() {
  return (
    <main className="page">
      <h1 className="page__title">Notes</h1>
      <NoteForm />
      <NoteList />
    </main>
  )
}
