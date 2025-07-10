import { createNoteAction, deleteNoteAction, getNotesAction, updateNoteActionDev } from '@/app/actions/notes'
import { getTagsAction, updateTagAction } from '@/app/actions/tags'
import { ErrorResponse } from '@/lib/utils'
import { NoteType } from '@/types/notes'
import { NoteTagType } from '@/types/tags'
import { create } from 'zustand'

interface NoteListTypeStore {
  items: NoteType[]
  getItems: () => void
  addItem: (id: string) => Promise<void>
  removeItem: (id: string) => Promise<void>
  updateItem: (id: string, updatedItem: Partial<Omit<NoteType, "id">>) => Promise<void>
}

export const useNoteStore = create<NoteListTypeStore>()((set, get) => ({
  items: [],
  getItems: async () => {
    await getNotesAction()
      .then((data: ErrorResponse| NoteType[]) => {
        if ('errorMessage' in data) return
        set({ items: data })
      })
  },
  addItem: async (id) => {
    await createNoteAction(id).then((data) => {
      if ('errorMessage' in data && data.errorMessage) {
        console.error("Error adding note in store: ", data.errorMessage)
        throw new Error("Failed to add note")
      }
      const newItem: NoteType = { id, title: "", text: "", isArchived: false, tagId: "" }
      set((state) => ({ 
        items: [newItem, ...state.items.filter(item => item.id !== id)]
      }))
    })
  },
  removeItem: async (id: string) => {
      await deleteNoteAction(id).then((data) => {
        if ('errorMessage' in data && data.errorMessage) {
          console.error("Error removing note in store: ", data.errorMessage)
          throw new Error("Failed to remove note")
        }
        set((state) => ({
          items: state.items.filter(item => item.id !== id)
        }))
      })
    },
  updateItem: async (id, updatedItem) => {
    const {title, text, isArchived, tagId} = updatedItem
    const tagIdToUse = tagId !== undefined && tagId !== null && tagId.length > 0 ? tagId : null
    
    await updateNoteActionDev(id, title, text, isArchived, tagIdToUse).then((data) => {
      if ('errorMessage' in data && data.errorMessage) {
        console.error("Error updating note in store: ", data.errorMessage)
          throw new Error("Failed to remove note")
      }
      const currentItems = get().items
      const updatedItems = currentItems.map(item =>
        item.id === id ? { ...item, ...updatedItem } : item
      )
      set({ items: updatedItems })
    })
  }
}))