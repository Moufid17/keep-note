import { Button } from '../ui/button'
import { Mic } from 'lucide-react'
import useSpeechToText from '@/hooks/useSpeechToText';

function VoiceButton({onNoteClick}: {onNoteClick?: (voiceNote: string) => void}) {

    const {isListening, startListening, stopListening, isSupportRecognition}  = useSpeechToText(onNoteClick)

    return (
        <Button 
            disabled={!isSupportRecognition}
            onMouseDown={startListening}
            onMouseUp= {stopListening}
            onTouchStart={startListening}
            onTouchEnd={stopListening}
            onTouchCancel={stopListening}
        >
            <Mic size="20" className={`${isListening && "animate-bounce"}`} />
        </Button>
    )
}

export default VoiceButton