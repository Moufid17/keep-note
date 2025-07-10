import { z } from "zod"

export const noteTagSchema = z.object({
    id: z.string(),
    name: z.string(),
    color: z.string(),
})

export type NoteTagType = z.infer<typeof noteTagSchema>

export const noteTagUpdateSchema = z.object({
    name: z.string().optional().default(""),
    color: z.string().optional().default(""),
})

export type NoteTagUpdateType = z.infer<typeof noteTagUpdateSchema>