import React from 'react'
import VoiceFormUI from '../components/VoiceFormUI'
import VoiceText from '../components/VoiceText'
import Graph from '../components/Graph'
import Clock from '../components/Clock'
import Helmet from '../components/Helmet'
import Rader from '../components/Rader'
import Arc from '../components/Arc'



const Home = () => {
  return (
    // Home page
    <div className="wrapper">
      <div className="one"><Clock/></div>
      <div className="two"><Rader/></div>
      <div className="three ">M.A.R.V.I.S</div>
      <div className="four"><Arc/></div>
      <div className="five"><Graph/></div>
      
      <div className="seven"> <Helmet/></div>
      <div className="eight text-align-center"><VoiceText/></div>
     
    </div>

    // <div className='jarvis'>
    //   <div className="center-text"> 
    //   <Clock/>
    //     <h1>Hi! Im M.A.R.V.I.S</h1>
       
    //   </div> 
     
    //   <Helmet/>
    //     <VoiceText/>
       
    // </div>

  )
}

export default Home