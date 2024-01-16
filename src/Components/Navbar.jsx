import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button, Grid } from '@mui/material';
import {auth} from '../firebaseConfig'
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Navbar({userName}) {
    
    const nav = useNavigate()

    const handleLogout = async()=>{
        try{
            await signOut(auth);
            localStorage.clear()
            toast.success('User Logout Successfully', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              });
        
            nav('/signin');
        }
        catch(err){
            console.log(err)
        }
      
    }
console.log(userName)
    return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        
        <Toolbar variant="dense" 
        sx={{padding:"1rem",display:'flex',justifyContent:'space-between',alignItems:'center'}}>
         
            <Typography variant='h4' >{userName}'s Todolist</Typography>
          <Grid>
            <Button  onClick={handleLogout}
            sx={{fontSize:'1rem',fontWeight:"bold",letterSpacing:"3px"}} color="inherit" component="div">
              Logout
            </Button>
            <Typography></Typography>  
          </Grid>  
          

        </Toolbar>
      </AppBar>
    </Box>
  );
}