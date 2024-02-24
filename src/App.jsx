import { useState } from 'react'
import './App.css'
import Navbar from './component/Navbar.jsx'
import Home from './page/Home.jsx'
import Create from './page/Create.jsx'
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom'
function App() {
  return (
    <Router>
    <div className='min-h-screen w-full h-full pt-24 px-3'>
      <Navbar></Navbar>
      <Routes>
        <Route exact path='/' Component={Home}>
        </Route>
        <Route exact path='/create' Component={Create}>
        </Route>
      </Routes>
    </div>
    </Router>
  )
}

export default App