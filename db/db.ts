import postgres from "postgres";
import { drizzle, PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { real, serial, text, pgTable } from "drizzle-orm/pg-core";

let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;

const conn = postgres({
  host: PGHOST,
  database: PGDATABASE,
  username: PGUSER,
  password: PGPASSWORD,
  port: 5432,
  ssl: "require",
});

const users = pgTable("playing_with_neon", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  value: real("value"),
});

export async function selectDrizzle() {
  const db: PostgresJsDatabase = drizzle(conn);
  const result = await db.select().from(users);
}

export async function selectAll() {
  const result = await conn`SELECT * FROM playing_with_neon`;
}
