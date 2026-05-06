import { pgTable, uuid, text, timestamp } from 'drizzle-orm/pg-core'

export const notes = pgTable('notes', {
	id: uuid('id').defaultRandom().primaryKey(),
	title: text('title').notNull(),
	content: text('content').notNull(),
	createdAt: timestamp('created_at').notNull().defaultNow(),
})

export type Note = typeof notes.$inferSelect
export type NewNote = typeof notes.$inferInsert
