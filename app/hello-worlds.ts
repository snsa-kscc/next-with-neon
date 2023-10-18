import postgres from "postgres";

let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;

const conn: any = postgres({
  host: PGHOST,
  database: PGDATABASE,
  username: PGUSER,
  password: PGPASSWORD,
  port: 5432,
  ssl: "require",
});

export async function selectAll() {
  const result = await conn`SELECT * FROM playing_with_neon`;
  console.log(result);
}
