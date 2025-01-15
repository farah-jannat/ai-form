// const { serial, varchar } = require("drizzle-orm/mysql-core");
const { serial, varchar, pgTable, text } = require("drizzle-orm/pg-core");

export const jsonForms = pgTable('jsonForms', {
    id: serial('id').primaryKey(),
    jsonform: text('jsonform').notNull(),
    createdBy: varchar('createdBy').notNull(),
    createdAt: varchar('createdAt').notNull()

})