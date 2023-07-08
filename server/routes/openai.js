import express from 'express'
import axios from 'axios'
import dotenv from 'dotenv'
import {openai} from '../server.js'

dotenv.config();
const router=express.Router();

router.post("/send",async(req,res)=>{
    try{
      const {text} =req.body 
      const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: text,
      temperature: 0.5,
      max_tokens: 2048,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0,
    });
       console.log('sent to backend')
       
        res.status(200).json({text: response.data.choices[0].text})
        console.log(response.data.choices[0].text)
    }
    catch(error){
        console.log("broooooooooo",error);
        res.status(500).json({error:error.message})
    }
})

export default router;