import { useState } from 'react';
import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom';
import Home from './pages/Home';
import 'babel-polyfill';
import 'core-js/stable';
import 'regenerator-runtime/runtime';




function App() {

  return (
   <div className="app">
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={<Home/>}
        />
         
      </Routes>
    </BrowserRouter>
   </div>
  )
}

export default App
