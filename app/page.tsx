import { getUser } from "@/auth/server";
import NewNoteButton from "@/components/common/NewNoteButton";
import NoteTextArea from "@/components/common/NoteTextArea";
import { Button } from "@/components/ui/button";
import { prismaClient } from "@/db/prisma";

type Props = {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
};

export default async function Home({ searchParams }: Props) {
  const nodeIdParam = (await searchParams).noteId || "";
  const user = await getUser();

  const noteId = (Array.isArray(nodeIdParam)) ? nodeIdParam[0] : nodeIdParam;

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
          <Button>Ask IA</Button>
          <NewNoteButton user={user}/>
        </div>
        <NoteTextArea noteId={noteId} startingNoteText={note ? note.text : ""}/>       
      </div>
    </div>
  );
}
