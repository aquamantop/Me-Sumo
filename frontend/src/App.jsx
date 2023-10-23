import { useState } from 'react'
import { Route, Routes } from 'react-router'
import './App.css'
import Home from './pages/Home'
import Club from './pages/Club'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/club/:id' element={<Club/>}/>
      </Routes>
    </>
  )
}

export default App
