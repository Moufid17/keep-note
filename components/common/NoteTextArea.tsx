"use client"
import React, { useEffect } from 'react'
import { Textarea } from '@/components/ui/textarea'
import useNote from '@/hooks/useNote';
import { useSearchParams } from 'next/navigation';
import { useTagStore } from '@/store/tagListStore';
import { NoteTagType } from '@/types/tags';
import { useNoteStore } from '@/store/noteListStore';

type Props = {
  noteId: string;
  startingNoteText: string;
}

let updateTimeout: NodeJS.Timeout;

function NoteTextArea({ noteId, startingNoteText }: Props) {
  const noteIdParam = useSearchParams().get("noteid") || "";
  const tagIdParam = useSearchParams().get("tagid") || "";
  const {noteText, setNoteText} = useNote();

  const {items: storeTags } = useTagStore((state) => state)
  const {items: noteStoreList, updateItem: updateNoteStoreList} = useNoteStore((state) => state)
  const storeTag: NoteTagType | undefined = storeTags.find(tag => tag.id === tagIdParam)

  const handleOnchangeNoteTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setNoteText(value)

    clearTimeout(updateTimeout);
    updateTimeout = setTimeout(async() => {
      
      const data = noteStoreList.find(note => note.id === noteId);
      if (!data) {
        console.error("Note not found in store:", noteId);
        return;
      }
      await updateNoteStoreList(noteId, { ...data, text:value }).catch((error) => {
        console.error("Error updating note in store:", error);
      })
    }, 1500);
  }

  useEffect(() => {
    if (noteIdParam === noteId) {
      setNoteText(startingNoteText);
    }
  }, [startingNoteText, noteId, noteIdParam, setNoteText]);

  const customStyleBorder = storeTag ? `4px double ${storeTag.color}` : '';

  return (
    <Textarea
      key={noteId}
      id="note-textarea"
      value={noteText}
      onChange={handleOnchangeNoteTextArea}
      autoFocus
      placeholder="Type your message here..."
      className="w-full max-w-4xl h-[60vh] text-start overflow-y-auto"
      style={{border: customStyleBorder}}
    />
  )
}

export default NoteTextArea