import { sql } from 'drizzle-orm';
import { mysqlTable, bigint, varchar, timestamp } from 'drizzle-orm/mysql-core';

export const user = mysqlTable('auth_user', {
	id: varchar('id', {
		length: 15 // change this when using custom user ids
	}).primaryKey(),
	// other user attributes
	username: varchar('username', {
		length: 55
	})
});

export const session = mysqlTable('user_session', {
	id: varchar('id', {
		length: 128
	}).primaryKey(),
	userId: varchar('user_id', {
		length: 15
	})
		.notNull()
		.references(() => user.id),
	activeExpires: bigint('active_expires', {
		mode: 'number'
	}).notNull(),
	idleExpires: bigint('idle_expires', {
		mode: 'number'
	}).notNull()
});

export const key = mysqlTable('user_key', {
	id: varchar('id', {
		length: 255
	}).primaryKey(),
	userId: varchar('user_id', {
		length: 15
	})
		.notNull()
		.references(() => user.id),
	hashedPassword: varchar('hashed_password', {
		length: 255
	})
});

export const todo = mysqlTable('todo', {
	id: varchar('id', {
		length: 48
	}).primaryKey(),
	userId: varchar('user_id', {
		length: 15
	})
		.notNull()
		.references(() => user.id),
	name: varchar('name', {
		length: 255
	}).notNull(),
	createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`)
});
