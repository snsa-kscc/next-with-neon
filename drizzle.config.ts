import { Config } from "drizzle-kit";
import "dotenv/config";

let { PGURL } = process.env;

export default {
  driver: "pg",
  schema: "db/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    connectionString: PGURL!,
  },
} satisfies Config;
