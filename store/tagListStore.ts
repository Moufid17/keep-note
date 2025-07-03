import { getTagsAction, updateTagAction } from '@/app/actions/tags'
import { ErrorResponse } from '@/lib/utils'
import { NoteTagType } from '@/types/tags'
import { create } from 'zustand'

interface NoteTagListTypeStore {
  items: NoteTagType[]
  getItems: () => Promise<void>
  addItem: (item: NoteTagType) => void
  removeItem: (id: string) => void
  updateItem: (id: string, updatedItem: Partial<NoteTagType>) => Promise<void>
}
  // setItems: (items: NoteTagType[]) => void
  // clearItems: () => void
  // getItemById: (id: string) => NoteTagType | null
  // getItemByName: (name: string) => NoteTagType | null
  // getItemByColor: (color: string) => NoteTagType | null

export const useTagStore = create<NoteTagListTypeStore>()((set, get) => ({
  items: [],
  getItems: async() => {
    await getTagsAction()
      .then((data: ErrorResponse| NoteTagType[]) => {
        if ('errorMessage' in data) return
        set({ items: data })
      })
  },
  addItem: () => set((state) => ({ 
    items: [...state.items, { id: '', name: '', color: '' }]
  })),
  removeItem: (id: string) => set((state) => ({
    items: state.items.filter(item => item.id !== id)
  })),
  updateItem: async (id, updatedItem) => {
    const {name, color} = updatedItem
    if (!name || !color) return

    await updateTagAction(id, name, color).then((data) => {
      if ('errorMessage' in data) return
      const currentItems = get().items
      const updatedItems = currentItems.map(item =>
        item.id === id ? { ...item, ...updatedItem } : item
      )
      set({ items: updatedItems })
    })

  }
}))

// setItems: (items) => set(() => ({ items })),
  // getItems: () => set((state) => ({ items: state.items })),
  // clearItems: () => set(() => ({ items: [] })),
  // getItemById: (id) => set((state) => ({
  //   item: state.items.find(item => item.id === id) || null
  // })),
  // getItemByName: (name) => set((state) => ({
  //   item: state.items.find(item => item.name === name) || null
  // })),
  // getItemByColor: (color) => set((state) => ({
  //   item: state.items.find(item => item.color === color) || null
  // })),