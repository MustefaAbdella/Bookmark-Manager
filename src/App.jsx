import { useState } from 'react'
import './App.css'
import SideBar from './components/SideBar/SideBar'
import Home from './components/Home/Home'
import { ContextProvider, useContextAPI } from './components/ContextAPI'
import NavBar from './components/NavBar/NavBar'
import { Route, Routes } from 'react-router-dom'
import Archive from './components/Archive/Archive'


function App() {

  const { isDark } = useContextAPI();

  return (

    <div className='app' >
      <SideBar />
      <div className='main-content'>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/archive' element={<Archive />} />
        </Routes>
      </div>
    </div>

  )
}

export default App
