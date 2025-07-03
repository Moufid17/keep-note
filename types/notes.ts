import { z } from "zod";

export const schemaNoteAskAIAction = z.object({
    noteId: z.string().min(1, "Note ID is required"),
    questions: z.array(z.string().min(1, "Question must not be empty")).min(1, "At least one question is required"),
    responses: z.array(z.string()).min(0, "At least one response is required"),
})

export const schemaNoteAskAIActionResponse = z.object({
    response: z.string().min(1, "Response content must not be empty"),
    errorMessage: z.string().optional(),
})

export type NoteAskAIAction = z.infer<typeof schemaNoteAskAIAction>
export type NoteListAskAIAction = Omit<NoteAskAIAction, 'noteId'>
export type NoteAskAIActionResponse = z.infer<typeof schemaNoteAskAIActionResponse>


export const noteSchema = z.object({
    id: z.string().min(36, "Note ID is required"),
    title: z.string().optional().default(""),
    text: z.string().optional().default(""),
    isArchived: z.boolean().default(false),
    tagId: z.string().nullable().optional().default(""),
})

export type NoteType = z.infer<typeof noteSchema>