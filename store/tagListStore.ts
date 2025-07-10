import { createTagAction, deleteTagAction, getTagsAction, updateTagAction } from '@/app/actions/tags'
import { ErrorResponse } from '@/lib/utils'
import { NoteTagType } from '@/types/tags'
import { create } from 'zustand'

interface NoteTagListTypeStore {
  items: NoteTagType[]
  getItems: () => Promise<void>
  addItem: (item: NoteTagType) => Promise<void>
  updateItem: (id: string, updatedItem: Partial<NoteTagType>) => Promise<void>
  removeItem: (id: string) => Promise<void>
}

export const useTagStore = create<NoteTagListTypeStore>()((set, get) => ({
  items: [],
  getItems: async() => {
    await getTagsAction()
      .then((data: ErrorResponse| NoteTagType[]) => {
        if ('errorMessage' in data) {
          throw new Error(data.errorMessage ?? 'Unknown error')
        }
        set({ items: data })
      })
  },
  addItem: async (newTag) => {
    const {id, name, color} = newTag
    await createTagAction(id, name, color).then((data) => {
      if ('errorMessage' in data && data.errorMessage) {
        console.error("Error updating tag in store: ", data.errorMessage)
        throw new Error("Failed to remove tag")
      }
      set((state) => ({ 
        items: [...state.items, { id, name, color }, ]
      }))
    })
  },
  removeItem: async (id: string) => {
    await deleteTagAction(id).then((data) => {
      if ('errorMessage' in data && data.errorMessage) {
        console.error("Error updating tag in store: ", data.errorMessage)
        throw new Error("Failed to remove tag")
      }
      set((state) => ({
        items: state.items.filter(item => item.id !== id)
      }))
    })
  },
  updateItem: async (id, updatedItem) => {
    const {name, color} = updatedItem
    if (!name || !color) return

    await updateTagAction(id, name, color).then((data) => {
      if ('errorMessage' in data && data.errorMessage) {
        console.error("Error updating tag in store: ", data.errorMessage)
        throw new Error("Failed to remove tag")
      }
      const currentItems = get().items
      const updatedItems = currentItems.map(item =>
        item.id === id ? { ...item, ...updatedItem } : item
      )
      set({ items: updatedItems })
    })

  }
}))