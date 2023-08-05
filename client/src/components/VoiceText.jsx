// VoiceText.jsx
import regeneratorRuntime from "regenerator-runtime";
import React from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import VoiceFormUI from "./VoiceFormUI";

const VoiceText = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div>
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <button onClick={SpeechRecognition.startListening}>Start</button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>
      <VoiceFormUI transcript={transcript} />
    </div>
  );
};
export default VoiceText;