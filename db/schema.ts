import { timestamp, pgTable, text, primaryKey, integer, boolean, serial, pgEnum } from "drizzle-orm/pg-core";
import type { AdapterAccount } from "@auth/core/adapters";
import { relations } from "drizzle-orm";

export const users = pgTable("user", {
  id: text("id").notNull().primaryKey(),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  role: text("role"),
});

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey(account.provider, account.providerAccountId),
  })
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").notNull().primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey(vt.identifier, vt.token),
  })
);

export const moodEnum = pgEnum("lang", ["en", "de", "fr"]);

export const receipes = pgTable(
  "recipe",
  {
    id: serial("id").notNull(),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    description: text("description").notNull(),
    createdAt: timestamp("createdAt", { mode: "date" }).notNull(),
    active: boolean("active").default(false),
    lang: moodEnum("lang").notNull(),
  },
  (recipe) => ({
    compoundKey: primaryKey(recipe.userId, recipe.description),
  })
);

export const userRelations = relations(users, ({ many }) => ({
  receipes: many(receipes),
}));

export const recipeRelations = relations(receipes, ({ one }) => ({
  user: one(users, {
    fields: [receipes.userId],
    references: [users.id],
  }),
}));

export const contents = pgTable("content", {
  id: serial("id").notNull().primaryKey(),
  title: text("title").notNull(),
  lang: moodEnum("lang").notNull(),
  description_1: text("description_1"),
  description_2: text("description_2"),
  description_3: text("description_3"),
});
