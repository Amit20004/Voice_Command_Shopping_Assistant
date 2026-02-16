'use client'
import { useState, useCallback, useRef } from "react";
import { Mic, MicOff } from "lucide-react";
import { toast } from "sonner";

interface CommandData {
  action?: "add" | "remove" | "remove-all";
  name?: string;
  quantity?: number;
}

interface VoiceButtonProps {
  onCommand: (data: CommandData) => void;
}

function parseCommand(transcript: string): CommandData | null {
  const text = transcript.toLowerCase().trim();

  if (text.includes("remove all") || text.includes("clear all") || text.includes("delete all")) {
    return { action: "remove-all" };
  }

  if (text.startsWith("remove") || text.startsWith("delete")) {
    const name = text.replace(/^(remove|delete)\s+/i, "").trim();
    if (name) return { action: "remove", name };
  }

  if (text.startsWith("add")) {
    const rest = text.replace(/^add\s+/i, "").trim();
    const match = rest.match(/^(\d+)\s+(.+)/);
    if (match) {
      return { action: "add", quantity: parseInt(match[1]), name: match[2] };
    }
    if (rest) return { action: "add", name: rest, quantity: 1 };
  }

  // Fallback: treat as add
  if (text) return { action: "add", name: text, quantity: 1 };

  return null;
}

const VoiceButton = ({ onCommand }: VoiceButtonProps) => {
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  const toggleListening = useCallback(() => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    const SpeechRecognitionAPI = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognitionAPI) {
      toast.error("Speech recognition not supported in this browser");
      return;
    }

    const recognition = new SpeechRecognitionAPI();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;
    recognitionRef.current = recognition as any;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => {
      setIsListening(false);
      toast.error("Couldn't hear that. Try again.");
    };

   recognition.onresult = (event:SpeechRecognitionResult ) => {
  const transcript = event.results?.[0]?.[0]?.transcript;

  if (!transcript) {
    toast.error("No voice detected. Try again.");
    return;
  }

  toast.info(`Heard: "${transcript}"`);
  const command = parseCommand(transcript);
  if (command) {
    onCommand(command);
  } else {
    toast.error("Didn't understand that command.");
  }
};


    recognition.start();
  }, [isListening, onCommand]);

  return (
    <div className="flex flex-col items-center gap-3">
      <button
        onClick={toggleListening}
        className={`relative rounded-full w-20 h-20 flex items-center justify-center transition-all duration-300 ${
          isListening
            ? "bg-primary shadow-glow scale-110"
            : "bg-primary/90 hover:bg-primary hover:shadow-elevated hover:scale-105"
        }`}
      >
        {isListening && (
          <>
            <span className="absolute inset-0 rounded-full bg-primary/40 animate-pulse-ring" />
            <span className="absolute inset-0 rounded-full bg-primary/20 animate-pulse-ring [animation-delay:0.5s]" />
          </>
        )}
        {isListening ? (
          <MicOff className="w-8 h-8 text-primary-foreground relative z-10" />
        ) : (
          <Mic className="w-8 h-8 text-primary-foreground relative z-10" />
        )}
      </button>
      <p className="text-sm text-muted-foreground">
        {isListening ? "Listening... tap to stop" : "Tap to speak"}
      </p>
    </div>
  );
};

export default VoiceButton;
