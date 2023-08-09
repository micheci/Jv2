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
    <div className="microphone">
      <div className="div">
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <button className='robotic-button' onClick={SpeechRecognition.startListening}>Start</button>
      <button className='end-button' onClick={SpeechRecognition.stopListening}>Stop</button>
      <button className='clear-button' onClick={resetTranscript}>Reset</button>
      </div>
      <br />
      <VoiceFormUI transcript={transcript} />
    </div>
  );
};
export default VoiceText;