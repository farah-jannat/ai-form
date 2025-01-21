

// const { serial, varchar } = require("drizzle-orm/mysql-core");
const { serial, varchar, pgTable, text } = require("drizzle-orm/pg-core");
import { integer as drizzleInteger } from 'drizzle-orm/pg-core';

export const JsonForms = pgTable('JsonForms', {
    id: serial('id').primaryKey(),
    jsonform: text('jsonform').notNull(),
    theme: varchar('theme'),
    background: varchar('background'),
    style: varchar('style'),
    createdBy: varchar('createdBy').notNull(),
    createdAt: varchar('createdAt').notNull()

})

export const userResponses = pgTable('userResponses', {
    id: serial('id').primaryKey(),
    jsonResponses: text('jsonResponses').notNull(),
    createdBy: varchar('createdBy').default('anonymus'),
    createdAt: varchar('createdAt').notNull(),
    formRef: drizzleInteger('formRef').references(() => JsonForms.id)

})