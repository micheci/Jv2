import React, { useState, useEffect } from "react";
import { usePostAiTextMutation } from "../../state/api";
import { useGetAiTextQuery, useDeleteAiTextMutation } from "../../state/api.js";
import VoiceText from "./VoiceText";

const VoiceFormUI = () => {
  const [message, setMessage] = useState("");
  const [trigger] = usePostAiTextMutation();
  const [deleteResponseMutation] = useDeleteAiTextMutation();
  //  const deleteResponseMutation = useDeleteAiTextMutation();

  const { data, isLoading, isFetching, isError, error, refetch } = useGetAiTextQuery();
  console.log(data);
  
 

  if (isLoading || isFetching) {
    return <div>loading...</div>;
  }

  if (isError) {
    console.log({ error });
    return <div>{error.status}</div>;
  }

  //function that sets users message and saves it to state
  const handleChange = (e) => setMessage(e.target.value);

  //function that handles submit and sends form to backend and also refreshes page
  const handleSubmit = async () => {
    console.log("test");
    const date = new Date()
      .toISOString()
      .replace("T", " ")
      .replace("Z", `${Math.floor(Math.random() * 1000)}+00:00`);
    const form = {
      created: date,
      text: message,
    };

    console.log(form);
    await trigger(form);
    if (data && data.data.length >= 5                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          ) {
      // Get the ID of the oldest response
      const oldestResponseId = data.data[0]._id;
      // Delete the oldest response
      console.log(oldestResponseId);
      console.log("got it")
      await deleteResponseMutation(oldestResponseId)
      // await deleteResponseMutation.mutateAsync(oldestResponseId);
    }
  
    
    await refetch({ force: true });
    setMessage("");
  };

  const dataArray = data?.data;

  return (
    <>
      <div className="message-form">
        <VoiceText/>
        <p>Message</p>
        <input
          type="text"
          value={message}
          onChange={handleChange}
          placeholder="click the button and speak"
        />
        <button onClick={() => handleSubmit()}>Get response</button>
      </div>
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
