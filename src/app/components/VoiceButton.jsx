"use client";
import { useState } from "react";
import { parseCommand } from "../utils/Parser";

export default function VoiceButton({ onCommand }) {
  const [listening, setListening] = useState(false);

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    const recognition = new SpeechRecognition();

    recognition.lang = "en-IN";
    recognition.start();
    setListening(true);

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      const parsed = parseCommand(text);
      onCommand(parsed);
      setListening(false);
    };

    recognition.onerror = () => {
      setListening(false);
    };

    recognition.onend = () => {
      setListening(false);
    };
  };

  return (
    <div className="text-center mt-4">
      <button
        onClick={startListening}
        className={`w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl transition-all duration-300
${listening ? "bg-red-500 animate-pulse scale-110" : "bg-black"}
shadow-xl`}
      >
        🎤
      </button>

      {listening && (
        <p className="text-red-500 mt-2 animate-pulse">
          Listening... Start Speaking !
        </p>
      )}
    </div>
  );
}
