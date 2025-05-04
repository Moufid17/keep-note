"use client"
import React from 'react'
import { Textarea } from '@/components/ui/textarea'
import useNote from '@/hooks/useNote';

function NoteTextArea() {
  const {noteText, setNoteText} = useNote();

  const handleOnchangeNoteTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNoteText(e.target.value)
  }

  return (
    <Textarea
      value={noteText}
      onChange={handleOnchangeNoteTextArea}
      autoFocus
      placeholder="Type your message here..." 
      className="w-full max-w-4xl min-h-124"
    />
  )
}

export default NoteTextArea