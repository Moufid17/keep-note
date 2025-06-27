import { Button } from '../ui/button'
import { Mic } from 'lucide-react'
import useSpeechToText from '@/hooks/useSpeechToText';
import { useIsMobile } from '@/hooks/use-mobile';

function VoiceButton({onNoteClick}: {onNoteClick?: (voiceNote: string) => void}) {

    const isMobile = useIsMobile()
    const {isListening, startListening, stopListening, isSupportRecognition}  = useSpeechToText(onNoteClick)

    let buttonProps: Partial<React.ComponentProps<typeof Button>> = {}

    if (isMobile) {
        buttonProps = {
            onClick:  isListening ? stopListening : startListening,
        }
    } else {
        buttonProps ={
            onMouseDown: startListening,
            onMouseUp: stopListening,
        }
    }
    return (
        <Button 
            disabled={!isSupportRecognition}
            {...buttonProps}
        >
            <Mic size="20" className={`${isListening && "animate-bounce"}`} />
        </Button>
    )
}

export default VoiceButton