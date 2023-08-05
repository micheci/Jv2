import React, { useState, useEffect } from "react";
import { usePostAiTextMutation } from "../../state/api";
import { useGetAiTextQuery, useDeleteAiTextMutation } from "../../state/api.js";

const VoiceFormUI = ({ transcript }) => {
  const [message, setMessage] = useState("");
  const [trigger] = usePostAiTextMutation();
  const [deleteResponseMutation] = useDeleteAiTextMutation();
  const [voices, setVoices] = useState([]);
  const [latestResponseText, setLatestResponseText] = useState('');

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
        speakText(lastResponse.text);
      }
    }
  }, [data]);

  if (isLoading || isFetching) {
    return <div>loading...</div>;
  }

  if (isError) {
    console.log({ error });
    return <div>{error.status}</div>;
  }

  const handleChange = (e) => setMessage(e.target.value);

  const speakText = (text, voice) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);

    if (voice) {
      utterance.voice = voice;
    }

    synth.speak(utterance);
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
      <div className="message-form">
        <input
          type="text"
          value={transcript}
          onChange={handleChange}
          placeholder="click the button and speak"
        />
        <button onClick={() => handleSubmit()}>Get response</button>
      </div>
      <button onClick={() => speakText(latestResponseText)}>Speak Last Response</button>
      <ul>
        {dataArray.map((item, index) => (
          <li key={index}>
            <strong>Text: </strong>
            {item.text || "N/A"}
            <br />
            <strong>Created At: </strong>
            {item.createdAt || "N/A"}
          </li>
        ))}
      </ul>
    </>
  );
};

export default VoiceFormUI;
