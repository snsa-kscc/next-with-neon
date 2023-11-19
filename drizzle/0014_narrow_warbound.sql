DO $$ BEGIN
 CREATE TYPE "lang" AS ENUM('en', 'de', 'fr');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "recipe" ADD COLUMN "lang" "lang";