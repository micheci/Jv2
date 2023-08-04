import express from 'express'
import axios from 'axios'
import dotenv from 'dotenv'
import { openai } from '../server.js';
import Responses from '../models/responses.js';

dotenv.config();
const router=express.Router();

//post the resposnes to mongodb
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
    const savedResponse=await Responses.create({text:response.data.choices[0].text
     ,createdAt:req.body.created})
     console.log(savedResponse)
       //console.log(response.data.choices[0].text)
       //console.log(req.body.created)
       
        res.status(200).json({data: savedResponse})
        
    }
    catch(error){
        console.log("broooooooooo",error);
        res.status(500).json({error:error.message})
    }
}),

router.get("/responses",async(req,res)=>{
    try{
        const responses=await Responses.find({})
         console.log(responses)
       
         res.status(200).json({data:responses})
        
    }
    catch(error){
        console.log("broooooooooo",error);
        res.status(500).json({error:error.message})
    }
})
router.delete('/delete/:id',async(req,res)=>{
    try {
        const { id } = req.params;
        console.log(id)
        const response = await Responses.findByIdAndDelete(id);
        console.log(response)
        console.log('911')
        if (!response) {
          return res.status(404).json({ message: 'Response not found testing' });
        }
    
        res.status(200).json({ message: 'Response deleted successfully' });
      } catch (error) {
        console.log("broooooooooo", error);
        res.status(500).json({ error: error.message });
      }
})

export default router;