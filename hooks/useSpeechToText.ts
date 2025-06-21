"use client";
import { useEffect, useRef, useState } from "react";

const useSpeechToText = (setNote?: (voiceNote:string) => void) => {
  const [isListening, setIsListening] = useState(false);
  const [_, setTranscript] = useState("");
  const [isSupported, setIsSupported] = useState(false);

  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setIsSupported(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "fr-FR";
    recognition.interimResults = false;
    recognition.continuous = true

    // Handle when recognition ends successfully
    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const text = event.results[0][0].transcript;
      setTranscript(text.trim());
      if (setNote) setNote(text.trim()); // Call the setNote function if provided
      recognition.stop();
      setIsListening(false);
    };

    // Handle when recognition ends with error
    recognition.onerror = (event) => {
      recognition.stop();
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition
    setIsSupported(true)

    return () => { recognition.stop() }
    
  }, []);

  const startListening = () => {
    const recognition = recognitionRef.current;
    if (recognition) {
      setTranscript("");
      setIsListening(true);
      recognition.start();
    }
  };

  const stopListening = () => {
    const recognition = recognitionRef.current;
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  };

  return {
    // transcript,
    isListening,
    startListening,
    stopListening,
    isSupportRecognition: isSupported,
  };
};

export default useSpeechToText;