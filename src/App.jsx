import { useState } from 'react'
import './App.css'
import SideBar from './components/SideBar/SideBar'
import Home from './components/Home/Home'
import { ContextProvider, useContextAPI } from './components/ContextAPI'


function App() {

  return (
    <ContextProvider>
      <div className="app">
        <SideBar />
        <Home />
      </div>
    </ContextProvider>
  )
}

export default App
