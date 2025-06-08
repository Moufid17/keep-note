"use client"
import React, { useEffect } from 'react'
import { Textarea } from '@/components/ui/textarea'
import useNote from '@/hooks/useNote';
import { useSearchParams } from 'next/navigation';
import { updateNoteAction } from '@/app/actions/notes';

type Props = {
  noteId: string;
  startingNoteText: string;
}

let updateTimeout: NodeJS.Timeout;

function NoteTextArea({ noteId, startingNoteText }: Props) {
  const noteIdParam = useSearchParams().get("noteId") || "";
  const {noteText, setNoteText} = useNote();

  useEffect(() => {
    if (noteIdParam === noteId) {
      setNoteText(startingNoteText);
    }
  }, [startingNoteText, noteId, noteIdParam, setNoteText]);

  const handleOnchangeNoteTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setNoteText(value)

    clearTimeout(updateTimeout);
    updateTimeout = setTimeout(() => {
      
      updateNoteAction(noteId, value);
    }, 1500);
  }

  return (
    <Textarea
      value={noteText}
      onChange={handleOnchangeNoteTextArea}
      autoFocus
      placeholder="Type your message here..." 
      className="w-full max-w-4xl h-[60vh] text-justify overflow-y-auto"
    />
  )
}

export default NoteTextArea