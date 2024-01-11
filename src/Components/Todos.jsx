import { Box, Button, Container, CssBaseline, Grid, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import {firestore,auth} from '../firebaseConfig'
import { arrayUnion, doc, getDoc, setDoc, updateDoc, } from 'firebase/firestore'
import TodoDisplay from './TodoDisplay'
import Navbar from './Navbar'

const Todos = () => {

    const [task,settask] = useState('')
    const [allTasks,setAllTasks] = useState([])

    useEffect(()=>{

        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
              const uid = user.uid;
              try {
                const docRef = doc(firestore, 'todos', uid);
                const docSnapShot = await getDoc(docRef);
                const taskData = docSnapShot?.data()?.task || []; // Set default value to an empty array
                setAllTasks(taskData);
              } catch (err) {
                console.error(err);
              }
            } else {
              // User is signed out, handle accordingly.
              console.log('signed out');
            }
          });

          return () => unsubscribe();}
          
          ,[])

    const handleSubmit = async(e)=>{
        
        e.preventDefault();
                
        try{
            const user = auth.currentUser;
            if(user){
                const uid = user.uid

                const docRef = doc(firestore,'todos',uid);

                const docSnapShot = await getDoc(docRef);

                if(docSnapShot.exists()){
                    await updateDoc(docRef,{task:arrayUnion({task})})
                    
                }
                else{
                    await setDoc(docRef,{task:[{task}]})
                }
                const updatedDocSnapShot = await getDoc(docRef);
                const updatedTaskData = updatedDocSnapShot?.data().task;
                setAllTasks(updatedTaskData);
            }
        }
        catch(err){
            console.log(err)
        }
        
        settask('');

    }

    const handleDeleteTask = (deletedTask) => {
        // Update state by removing the deleted task
        setAllTasks((prevTasks) => prevTasks.filter((task) => task !== deletedTask));
      };
    
      const handleUpdateTask = async() => {
        
      };


    return (
    
    <div>
        <Container sx={{marginTop:"8rem"}}>
            <Navbar/>
            <CssBaseline/>
            
           
            <Box component='form'
             sx={{display:'flex',justifyContent:'space-between',alignItems:'center',
            gap:'10px',width:'100%', margin:'auto'}}
            onSubmit={handleSubmit}
            >
                <TextField 
                 margin="normal"
                 required
                 fullWidth
                 id="task"
                 label="task"
                 name="task"
                 autoComplete="task"
                 autoFocus
                 onChange={e=>{settask(e.target.value)}}
                 value={task}
                />
                <Button variant='contained' type='submit' sx={{padding:'1rem 0rem'}}>Add</Button>
            </Box>

            <Box>
                
                <Grid>
                <div>

                   {allTasks?.map(task=><TodoDisplay task={task} 
                   onDelete={handleDeleteTask}          
                   onUpdate = {handleUpdateTask}
                   />)
                   }
                </div>
                </Grid>
            </Box>
        </Container>

    </div>
  )
}

export default Todos