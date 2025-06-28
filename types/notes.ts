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