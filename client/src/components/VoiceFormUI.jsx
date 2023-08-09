import React, { useState, useEffect } from "react";
import {
  usePostAiTextMutation,
  useGetAiTextQuery,
  useDeleteAiTextMutation,
} from "../../state/api";

const VoiceFormUI = ({ transcript }) => {
  const [message, setMessage] = useState("");
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [latestResponseText, setLatestResponseText] = useState("");
  const [voices, setVoices] = useState([]);
  const [isSpeaking, setIsSpeaking] = useState(false); // State variable for glowing effect

  const [trigger] = usePostAiTextMutation();
  const [deleteResponseMutation] = useDeleteAiTextMutation();

  const { data, isLoading, isFetching, isError, error, refetch } = useGetAiTextQuery();

  useEffect(() => {
    const synth = window.speechSynthesis;
    synth.onvoiceschanged = () => {
      const availableVoices = synth.getVoices();
      setVoices(availableVoices);
    };
  }, []);

  useEffect(() => {
    if (data) {
      const lastResponse = data?.data[data?.data.length - 1];
      if (lastResponse) {
        setLatestResponseText(lastResponse.text);
        // Speak the latest response with the selected voice after 500ms delay
        setTimeout(() => {
          speakText(lastResponse.text, selectedVoice);
        }, 500);
      }
    } else {
      setLatestResponseText(""); // Clear the latest response text when there is no data
    }
  }, [data, selectedVoice]);

  if (isLoading || isFetching) {
    return <div>loading...</div>;
  }

  if (isError) {
    console.log({ error });
    return <div>This is an error</div>;
  }

  const handleChange = (e) => setMessage(e.target.value);

  const handleVoiceSelect = (e) => {
    const selectedVoiceName = e.target.value;
    const selectedVoice = voices.find((voice) => voice.name === selectedVoiceName);
    setSelectedVoice(selectedVoice);
  };

  const speakText = (text, voice) => {
    setIsSpeaking(true); // Set the glowing effect to true when speaking starts

    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);

    if (voice) {
      utterance.voice = voice;
    }

    synth.speak(utterance);

    utterance.onend = () => {
      setIsSpeaking(false); // Reset the glowing effect when speaking ends
    };
  };

  const handleSubmit = async () => {
    const date = new Date()
      .toISOString()
      .replace("T", " ")
      .replace("Z", `${Math.floor(Math.random() * 1000)}+00:00`);
    const form = {
      created: date,
      text: transcript,
    };

    await trigger(form);

    if (data && data.data.length >= 5) {
      const oldestResponseId = data.data[0]._id;
      await deleteResponseMutation(oldestResponseId);
    }

    await refetch({ force: true });

    // Save the latest response text to the state variable
    if (data && data.data.length > 0) {
      const lastResponse = data?.data[data?.data.length - 1];
      setLatestResponseText(lastResponse.text);
    }

    setMessage("");
  };
  const dataArray = data?.data;


  return (
    <>
      <div className="container">
        <div className="text-area1">
        <input
          type="text"
          value={transcript}
          onChange={handleChange}
          placeholder="click the button and speak"
        />
        <button onClick={() => handleSubmit()}>Get response</button>
        </div>
      <br />
        <div className="text-area2">
        <select value={selectedVoice?.name} onChange={handleVoiceSelect}>
          {voices.map((voice) => (
            <option key={voice.name} value={voice.name}>
              {voice.name}
            </option>
          ))}
        </select>
     </div>
     <br />
     </div>

        <div className="message-form">
        <div className={`circle ${isSpeaking ? "glowing" : ""}`}>
          <div className="circle-text">Jarvis</div>
        </div>
      </div>

     

      <button onClick={() => speakText(latestResponseText, selectedVoice)}>
        Speak Last Response
      </button>

      <div className="list-container">
        <ul className="list"> 
        {dataArray.map((item, index) => (
          <li className='list-item' key={index}>
            <strong>Text: </strong>
            {item.text || "N/A"}
            <br />
            <strong>Created At: </strong>
            {item.createdAt || "N/A"}
          </li>
        ))}
        </ul>
      </div>

      {/* <canvas id="visualizer" width="800" height="200"></canvas> */}
    
    </>
  );
};

export default VoiceFormUI;
