import { z } from "zod"

export const noteTagSchema = z.object({
    id: z.string(),
    name: z.string(),
    color: z.string(),
})

export type NoteTagType = z.infer<typeof noteTagSchema>