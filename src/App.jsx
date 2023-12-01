import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import TotalPanel from './components/TotalPanel/TotalPanel';
import './App.css'
import Formulario from './components/Form/Formulario';
import ListProducts from './components/ListProducts';
import Categories from './components/Categories';
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {

    return (
       <div>
         <BrowserRouter>
           <h1>7ecnoShop</h1>
           <Routes>
             <Route path='/' element={<TotalPanel/>}/>
             <Route path='/admin/:id' element={<Formulario/>}/>
           </Routes>
         </BrowserRouter>
   
         <div>
           <h1>Lista de Productos</h1>
           <ListProducts />
           <div>
            <Categories />
           </div>
         </div>
       </div>
       
       
    )
   }

export default App
