import React, { useState } from "react";
import { usePostAiTextMutation } from "../../state/api";


const VoiceFormUI = () => {
        const [message,setMessage]=useState("");
        const [trigger] = usePostAiTextMutation();

    
    const handleChange=(e)=>setMessage(e.target.value)

        const handleSubmit = () => {
            console.log('test'); 
              const date = new Date()
              .toISOString()
              .replace("T", " ")
              .replace("Z", `${Math.floor(Math.random() * 1000)}+00:00`);
            const form = {
              created: date,
              text: message,
            };
        
           console.log(form)
           trigger(form);
            setMessage("");
          };
  return (

    <div className='message-form'>
        <p>Message</p>
        <input 
            type="text"
            value={message}
            onChange={handleChange}
            placeholder='click the button and speak'
         />        
         
        

         <button onClick={() => handleSubmit()}>Get response</button>
    </div>
  )
}

export default VoiceFormUI