import { useState } from 'react'
import './App.css'
import {Routes,Route} from 'react-router-dom';
import SignUp from './Components/SignUp';
import SignIn from './Components/SignIn';
import Todos from './Components/Todos';

function App() {
  
  return (
    <Routes>
      <Route index Component={SignUp}/>
      <Route path='/signin' Component={SignIn}/>
      <Route path='/todos' Component={Todos}/>

    </Routes>
  )
}

export default App
