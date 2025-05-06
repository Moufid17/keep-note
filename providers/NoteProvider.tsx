"use client"
import { createContext, useState } from 'react';

interface INoteProviderProps {
    noteText: string;
    setNoteText: (noteText: string) => void;
}

type NoteProviderProps = {
    children: Readonly<React.ReactNode>;
}

export const NoteProviderContext = createContext<INoteProviderProps>({
    noteText: '',
    setNoteText: () => {},
})

function NoteProvider({children}: NoteProviderProps) {
    const [noteText, setNoteText] = useState<string>('')

    return (
        <NoteProviderContext.Provider value={{noteText, setNoteText}}>
            {children}
        </NoteProviderContext.Provider>
    )
}

export default NoteProvider