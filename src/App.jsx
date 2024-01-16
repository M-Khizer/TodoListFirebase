import { useState } from 'react'
import './App.css'
import {Routes,Route} from 'react-router-dom';
import SignUp from './Components/SignUp';
import SignIn from './Components/SignIn';
import Todos from './Components/Todos';
import AuthRoute from './AuthRoute';
import ProtectedRoute from './ProtectedRoute';

function App() {
  
  return (
    <Routes>
      <Route element={<AuthRoute/>}>
        <Route index Component={SignUp}/>
        <Route path='/signin' Component={SignIn}/>
      </Route>

      <Route element={<ProtectedRoute/>}>
        <Route path='/todos' Component={Todos}/>
      </Route>
     

    </Routes>
  )
}

export default App
