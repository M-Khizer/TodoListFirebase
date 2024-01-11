import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import {auth} from '../firebaseConfig'
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
    
    const nav = useNavigate()

    const handleLogout = async()=>{
        try{
            await signOut(auth);
            nav('/signin');
        }
        catch(err){
            console.log(err)
        }
      
    }

    return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        
        <Toolbar variant="dense" 
        sx={{padding:"1rem",display:'flex',justifyContent:'space-between',alignItems:'center'}}>
         
            <Typography variant='h4' >TODO App</Typography>
                
          <Button  onClick={handleLogout}
          sx={{fontSize:'1rem',fontWeight:"bold",letterSpacing:"3px"}} color="inherit" component="div">
            Logout
          </Button>

        </Toolbar>
      </AppBar>
    </Box>
  );
}