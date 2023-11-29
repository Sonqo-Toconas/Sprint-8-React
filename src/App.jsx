import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import TotalPanel from './components/TotalPanel/TotalPanel';
import './App.css'
import Formulario from './components/Form/Formulario';
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
 
  return (
    <BrowserRouter>
    <h1>7ecnoShop</h1>
    <Routes>
      <Route path='/' element={<TotalPanel/>}/>
      <Route path='/admin/:id' element={<Formulario/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
