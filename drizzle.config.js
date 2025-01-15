import { defineConfig } from "drizzle-kit";

export default defineConfig({
    schema: "./configs/schema.js",
    out: "./drizzle",
    dialect: 'postgresql',
    dbCredentials: {
        url: 'postgresql://neondb_owner:ihL4mbykC1Sp@ep-wispy-leaf-a5uad4xh.us-east-2.aws.neon.tech/AI%20Form?sslmode=require',
    }
});
