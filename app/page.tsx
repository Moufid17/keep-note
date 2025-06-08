import AskAIButton from "@/components/common/AskAIButton";
import HomePage from "@/components/common/HomePage";
import NewNoteButton from "@/components/common/NewNoteButton";
import NoteTextArea from "@/components/common/NoteTextArea";
import { generateNoteId } from "@/lib/utils";
import { prismaClient } from "@/db/prisma";
import { getUser } from "@/auth/server";

type Props = {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
};

export default async function Home({ searchParams }: Props) {
  const user = await getUser();

  if (!user) return ( <HomePage /> )
    
  const nodeIdParam = (await searchParams).noteId || "";
  
  let noteId = (Array.isArray(nodeIdParam)) ? nodeIdParam[0] : nodeIdParam;
  if (noteId.length === 0) noteId = generateNoteId()

  const note = await prismaClient.note.findUnique({
    where: {
      id: noteId, 
      author: { email: user?.email }  
    },
    select: {
      text: true,
    }
  });

  return (
    <div className="flex flex-col items-center w-full h-screen">
      <div className="w-full max-w-4xl flex flex-col justify-center gap-4 p-2">
        <div className="flex gap-4 justify-end items-center">
          <AskAIButton />
          <NewNoteButton user={user}/>
        </div>
        <NoteTextArea noteId={noteId} startingNoteText={note ? note.text : ""}/>       
      </div>
    </div>
  );
}
