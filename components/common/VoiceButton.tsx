import { useEffect, useRef, useState } from 'react'
import { Button } from '../ui/button'
import { Mic } from 'lucide-react'
import { handleError } from '@/lib/utils';
import { set } from 'zod';

function VoiceButton({onNoteClick}: {onNoteClick?: (voiceNote: string) => void}) {

    const [isSupported, setIsSupported] = useState<boolean>(false);
    const [isListening, setIsListening] = useState<boolean>(false);
    const [localVoiceNote, setTranscript] = useState<string>('');

    const speechInstanceRef = useRef<any>(null);
    const voiceRef = useRef<string>('');
    // Check if the browser supports the Web Speech API
    if (!('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
        console.warn('Web Speech API is not supported in this browser.');
        return null; // Return null if not supported
    }
    const handleOnStopRecording = () => {
        const speechInstance = speechInstanceRef.current;
        if (speechInstance) {
            speechInstance.stop();
            setIsListening(false);
            const data = voiceRef.current.trim()
            if (data.length > 0 && onNoteClick) {
                onNoteClick(data);
            }
        }
    }

    const handleOnStartRecording = () => {
        try {
            const speechInstance = speechInstanceRef.current;
            voiceRef.current = ''; // Reset the voiceRef before starting
            if (speechInstance) {
                speechInstance.start();
                speechInstance.onresult = (event: any) => {
                    const currentTranscript = event.results[0][0].transcript;
                    voiceRef.current += ` ${currentTranscript.trim()}`;
                    setTranscript(voiceRef.current.trim());
                }
                speechInstance.onend = () => {
                    setIsListening(false);
                };
            }
        } catch (error) {
            return handleError(error);
        }
    }
    useEffect(() => {
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (SpeechRecognition) {
            const recognition = new SpeechRecognition();
            recognition.lang = 'fr-FR';
            speechInstanceRef.current = recognition;
            setIsSupported(true);
        } else {
            console.warn('Web Speech API is not supported in this browser.');
            setIsSupported(false);
        }
    }, []);
    
    return (
        <Button disabled={!isSupported}
            onMouseDown={() => {
                setIsListening(true);
                handleOnStartRecording()
            }}
            onMouseUp= {handleOnStopRecording}
            onTouchStart={() => {
                setIsListening(true);
                handleOnStartRecording()
            }}
            onTouchEnd={handleOnStopRecording}
        >
            <Mic size="20" className={`${isListening && "animate-bounce"}`} />
        </Button>
    )
}

export default VoiceButton