import React,{useState,useContext,useEffect} from 'react'
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import AddIcon from '@mui/icons-material/Add';
import {AuthContext} from '../AuthContext';
import TextField from '@mui/material/TextField';



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

function AddBatchModal() {
  const [addBatch,setAddBatch] = useState('')
  const [batchAdvisor,setBatchAdvisor] = useState('')
  const [batchLocation,setBatchLocation] = useState('')
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  let {authTokens}=useContext(AuthContext)
    const authAxios = axios.create({
      baseURL:'http://127.0.0.1:8000',
      headers:{
        Authorization:`Bearer ${authTokens.access}`
      },
    });
  const handleSubmits=()=>{
    axios.post('http://127.0.0.1:8000/register_batch/',{
      batch:addBatch,
      batch_advisor:batchAdvisor,
      location:batchLocation
    })
    .then((response)=>{
      console.log(response.data)
    }).catch((error)=>{
      alert(error.message)
    })
  }

  return (
    <div>
      <span type='button' onClick={()=>{handleOpen()}}>
      <AddIcon />
      </span>
      <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
      >
        <Fade in={open}>
          <Box sx={style}>            
            <TextField id="add-batch" label="Add Batch" variant="standard" 
            value={addBatch} onChange={(e)=>setAddBatch(e.target.value)}/>
            <TextField id="batch-advisor" label="Batch Advisor" variant="standard" 
            value={batchAdvisor} onChange={(e)=>setBatchAdvisor(e.target.value)}/>
            <TextField id="batch-location" label="Batch Location" variant="standard" 
            value={batchLocation} onChange={(e)=>setBatchLocation(e.target.value)}/>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained" onClick={(e)=>{handleSubmits();handleClose()}}sx={{ mt: 3, ml: 1 }}>{'Ok'}</Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
    </div>
  )
}

export default AddBatchModal