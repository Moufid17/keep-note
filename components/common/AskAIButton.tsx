"use client"
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ArrowUp } from "lucide-react";
import { toast } from "sonner";
import { askAIAction } from "@/app/actions/notes";
import { ErrorResponse } from "@/lib/utils";

function AskAIButton() {
    const noteIdParam = useSearchParams().get("noteId") || "";
    if (Array.isArray(noteIdParam)) {
        toast.warning("Note - Ask AI", {
            icon: "⚠️",
            position: "top-right",
            description:"Invalid note, please ensure to select a valid note."
        });
        return;
    }
    const [oldNoteParamId, setOldNoteParamId] = useState<string>("");
    const [currentQuestion, setCurrentQuestion] = useState<string>("");
    const [questions, setQuestions] = useState<string[]>([]);
    const [responses, setResponses] = useState<string[]>([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [isNewQuestionAllowed, setIsNewQuestionAllowed] = useState(true);

    const handleAskAIButtonClick = (isOpen: boolean) => {
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
    }
    
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

    const handleCloseDialogWithoutCloseButton = (event: KeyboardEvent) => { 
        // Prevent closing the dialog when clicking outside or pressing escape
        event.preventDefault()
        return 
    }

    return (
        <Dialog open={openDialog} onOpenChange={handleAskAIButtonClick}>
            <DialogTrigger asChild>
                <Button variant={"outline"}>Ask IA</Button>
            </DialogTrigger>
                <DialogContent className="w-[90vw] md:min-w-2xl lg:min-w-4xl xl:min-w-6xl h-[90vh] overflow-y-auto flex flex-col justify-between items-between"
                    onEscapeKeyDown={handleCloseDialogWithoutCloseButton} 
                    onInteractOutside={(e) => {
                            e.preventDefault();
                            return
                        }
                    }
                >
                    <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. This will permanently delete your account
                            and remove your data from our servers.
                        </DialogDescription>
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
    )
}

export default AskAIButton