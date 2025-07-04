import { getNotesAction, updateNoteActionDev } from '@/app/actions/notes'
import { getTagsAction, updateTagAction } from '@/app/actions/tags'
import { ErrorResponse } from '@/lib/utils'
import { NoteType } from '@/types/notes'
import { NoteTagType } from '@/types/tags'
import { create } from 'zustand'

interface NoteListTypeStore {
  items: NoteType[]
  getItems: () => void
  addItem: (item: NoteType) => void
  removeItem: (id: string) => void
  updateItem: (id: string, updatedItem: Partial<NoteType>) => Promise<void>
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
  addItem: () => set((state) => ({ 
    items: [...state.items, { id: '', title: '', text: '', isArchived: false, tagId: null }]
  })),
  removeItem: (id: string) => set((state) => ({
    items: state.items.filter(item => item.id !== id)
  })),
  updateItem: async (id, updatedItem) => {
    const {title, text, isArchived, tagId} = updatedItem

    await updateNoteActionDev(id, title, text, isArchived, tagId).then((data) => {
      if ('errorMessage' in data) return
      const currentItems = get().items
      const updatedItems = currentItems.map(item =>
        item.id === id ? { ...item, ...updatedItem } : item
      )
      set({ items: updatedItems })
    })
  }
}))