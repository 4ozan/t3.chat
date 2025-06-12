import { timestamp } from "drizzle-orm/pg-core"

//column helpers
export const timestamps = {
    update_at : timestamp(),
    created_at: timestamp().defaultNow().notNull(),
    deleted_at: timestamp()
 }
