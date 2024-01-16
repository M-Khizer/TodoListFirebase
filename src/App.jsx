import { useState } from 'react'
import './App.css'
import {Routes,Route} from 'react-router-dom';
import SignUp from './Components/SignUp';
import SignIn from './Components/SignIn';
import Todos from './Components/Todos';
import AuthRoute from './AuthRoute';
import ProtectedRoute from './ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  
  return (
    <>
     <Routes>
      <Route element={<AuthRoute/>}>
        <Route index Component={SignUp}/>
        <Route path='/signin' Component={SignIn}/>
      </Route>

      <Route element={<ProtectedRoute/>}>
        <Route path='/todos' Component={Todos}/>
      </Route>
     
    </Routes>
    
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />    
    
    </>
   
 
 )
}

export default App
