import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Home } from './pages/Home'
import { Header } from './components/Header'
import { Footer } from './components/Footer'

import './App.scss'


function App() {
  return (
    <>
      <BrowserRouter>
        <Header/>
        <Routes>
           <Route path='/' element={<Home/>}/>
           <Route path='*' element={<div>404</div>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
