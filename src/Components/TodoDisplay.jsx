import React, { useState } from 'react';
import { Button, Typography, Box, TextField } from '@mui/material';
import { doc, updateDoc, arrayRemove,getDoc } from 'firebase/firestore';
import { auth, firestore } from '../firebaseConfig';

const TodoDisplay = ({ task, onDelete, onUpdate }) => {
  const [editing, setEditing] = useState(false);
  const [updatedTask, setUpdatedTask] = useState(task.task);
  

  const handleDelete = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const uid = user.uid;
        const docRef = doc(firestore, 'todos', uid);
        await updateDoc(docRef, { task: arrayRemove({ task: task.task }) });
        onDelete(task);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async () => {
    try {
  
    const user = auth.currentUser;
      if (user) {
    
        const uid = user.uid;
        const docRef = doc(firestore, 'todos', uid);
  
        // Get the current tasks from the document
        const docSnapshot = await getDoc(docRef);
        const currentTasks = docSnapshot.data().task || [];
        // Find the index of the task to be updated
        const taskIndex = currentTasks.findIndex((t) => t.task === task.task);
        // Update the task at the found index
        

        currentTasks[taskIndex] = { task: updatedTask };
  
        // Update the document with the modified tasks
        await updateDoc(docRef, { task: currentTasks });
  
        // Trigger the onUpdate callback with the updated task
        onUpdate();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setEditing(false);
    }
  };
  

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid black',
        padding: '1rem',
      }}
    >
      {editing ? (
        <TextField
          value={updatedTask}
          onChange={(e) => setUpdatedTask(e.target.value)}
        />
      ) : (
        <Typography variant='h5'>{task.task}</Typography>
      )}
      <Box>
        {editing ? (
          <Button
            variant='contained'
            sx={{ backgroundColor: '#62D56F', marginRight: '12px' }}
            onClick={handleUpdate}
          >
            Save
          </Button>
        ) : (
          <Button
            variant='contained'
            sx={{ backgroundColor: '#62D56F', marginRight: '12px' }}
            onClick={() => setEditing(true)}
          >
            Edit
          </Button>
        )}
        <Button
          variant='contained'
          sx={{ backgroundColor: '#FF5E5B' }}
          onClick={handleDelete}
        >
          Delete
        </Button>
      </Box>
    </Box>
  );
};

export default TodoDisplay;
