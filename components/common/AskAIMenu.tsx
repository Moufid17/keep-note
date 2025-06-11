"use client"
import { useCallback, useEffect, useState } from "react";
import { notFound, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { ArrowUp, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { askAIAction } from "@/app/actions/notes";
import { ErrorResponse } from "@/lib/utils";

function AskAIMenu() {
    const noteIdParam = useSearchParams().get("noteId") || "";

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    
    const [oldNoteParamId, setOldNoteParamId] = useState<string>("");
    const [currentQuestion, setCurrentQuestion] = useState<string>("");
    const [questions, setQuestions] = useState<string[]>([]);
    const [responses, setResponses] = useState<string[]>([]);
    const [isNewQuestionAllowed, setIsNewQuestionAllowed] = useState(true);

    if (Array.isArray(noteIdParam)) {
        toast.warning("Note - Ask AI", {
            icon: "⚠️",
            position: "top-right",
            description:"Invalid note, please ensure to select a valid note."
        });
        notFound();
    }

    const handleAskAIButtonClick = useCallback((isOpen: boolean) => {
        if (isOpen) {
            // Reset state if the noteId has changed
            if (oldNoteParamId !== noteIdParam) {
                setOldNoteParamId(noteIdParam);
                setCurrentQuestion("");
                setQuestions([]);
                setResponses([]);
            }
        } 
        setOpenDialog(isOpen);
    }, [oldNoteParamId, noteIdParam]); 
    
    const handleSubmitQuestion = async () => {
        if (noteIdParam.length <= 0) {
            setIsNewQuestionAllowed(false);
            toast.error("Note - Ask AI", {
                icon: "❌",
                position: "top-right",
                description:"Please select a valid note to ask questions."
            });
            return;
        };
        if (responses.length >= 10) {
            setIsNewQuestionAllowed(false);
            toast.warning("Question limit hit !", {
                icon: "⚠️",
                position: "top-right",
                description:"Maximum of 10 questions reached. Please clear the list to ask more."
            });
            return;
        }
        if (currentQuestion.trim() === "") return;
        setQuestions([...questions, currentQuestion]);
        setResponses([...responses, "Loading..."]);
        setCurrentQuestion("");
        let currentResponse = "";

        await askAIAction(noteIdParam, [...questions, currentQuestion], responses)
          .then((response: string | ErrorResponse) => {
            if (typeof response === "string") {
                currentResponse = response;
            }
            if (typeof response === "object" && response !== null && "errorMessage" in response) {
                currentResponse = (response as ErrorResponse).errorMessage;
            }
        })
        setResponses(prevResponses => {
            const newResponses = [...prevResponses];
            newResponses[newResponses.length - 1] = currentResponse; // Update the last response
            return newResponses;
        });
    }
    const handleTextAreaInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setCurrentQuestion(value);
        setIsNewQuestionAllowed(value.trim() !== "");
    }

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.ctrlKey && event.key === "I") {
                event.preventDefault();
                if (openDialog == false) handleAskAIButtonClick(true);
            }
        }
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        }
    }, [openDialog, handleAskAIButtonClick]);

    return (
        <>
            <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
                <DropdownMenuTrigger asChild><Button variant={"outline"}>Ask AI<ChevronDown/></Button></DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>Options</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                        <DropdownMenuItem onSelect={() => {
                            setIsDropdownOpen(false);
                            handleAskAIButtonClick(true);
                        }}>
                            Ask AI <span className="text-gray-600 dark:bg-black border rounded-sm px-1">Ctrl + I</span>
                        </DropdownMenuItem>
                <DropdownMenuItem disabled>Ask AI(Selects/All)<sup className="border p-1.5 rounded-sm  bg-brand-400">Comming soon</sup></DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <Dialog open={openDialog} onOpenChange={handleAskAIButtonClick}>
                <DialogContent className="w-[90vw] md:min-w-2xl lg:min-w-4xl xl:min-w-6xl h-[90vh] overflow-y-auto flex flex-col justify-between items-between"
                    onEscapeKeyDown={(e) => e.preventDefault()} 
                    onInteractOutside={(e) => e.preventDefault()}
                >
                    <DialogHeader>
                        <DialogTitle>Ask AI About Your Notes</DialogTitle>
                        <DialogDescription>Out AI can answer questions about all of your notes</DialogDescription>
                    </DialogHeader>
                    <div className="overflow-y-auto min-h-fit w-full mb-2">
                        {questions.map((question, index) => (
                            <div key={index} className="mx-6 flex flex-col gap-5 ">
                                <div className="flex justify-end ml-10 rounded-lg p-2 border">
                                    <p className="text-sm font-semibold text-justify text-wrap">{question}</p>
                                </div>
                                {responses[index] && (<div className="flex justify-start sm:mr-10 p-2 mb-5 bg-brand-800 dark:bg-brand-400 rounded-lg">
                                    <p className="text-sm text-justify text-white dark:text-black break-words w-full"
                                        dangerouslySetInnerHTML={{ __html: responses[index] }}
                                    />
                                </div>)}
                            </div>
                        ))}
                    </div>
                    <DialogFooter>
                        <div className="bg-background w-full">
                            <div className="relative z-1 flex justify-between items-center w-full">
                                <textarea
                                    value={currentQuestion}
                                    onChange={handleTextAreaInputChange}
                                    placeholder="Ask anything"
                                    className="w-full p-2 border rounded mb-2"
                                    onKeyDown={(e) => {
                                            if (e.key === "Enter" && !e.shiftKey) {
                                                e.preventDefault();
                                                handleSubmitQuestion();
                                            }
                                        }
                                    }
                                />
                                <div className="absolute z-2 right-0 top-0 h-full flex items-center p-2">
                                    <Button disabled={!isNewQuestionAllowed || currentQuestion.trim() === ""}
                                        onClick={handleSubmitQuestion}
                                    >
                                        <ArrowUp />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default AskAIMenu