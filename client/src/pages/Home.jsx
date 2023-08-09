import React from 'react'
import VoiceFormUI from '../components/VoiceFormUI'
import VoiceText from '../components/VoiceText'
import Graph from '../components/Graph'

const Home = () => {
  return (
    // Home page
    <div className='jarvis'>
      <div className="center-text">
        <h1>Hi! Im M.A.R.V.I.S</h1>
      </div>
        <VoiceText/>
       
    </div>

  )
}

export default Home