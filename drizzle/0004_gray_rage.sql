ALTER TABLE "recipe" DROP CONSTRAINT "recipe_userId_createdAt";--> statement-breakpoint
ALTER TABLE "recipe" ADD PRIMARY KEY ("createdAt");