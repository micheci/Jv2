import React, { useState } from 'react'
import VoiceFormUI from './VoiceFormUI'

const Ai = () => {
    const [message,setMessage]=useState("");
    
    const handleChange=(e)=>setMessage(e.target.value)
 
    // const handleSubmit = () => {
    //     console.log('test'); 
    //       const date = new Date()
    //       .toISOString()
    //       .replace("T", " ")
    //       .replace("Z", `${Math.floor(Math.random() * 1000)}+00:00`);
    //     const form = {
    //       created: date,
    //       text: message,
    //     };
    
    //    console.log(form)
    //     //setMessage("");
    //   };


    return (
   <VoiceFormUI
       
   />
  )
}

export default Ai