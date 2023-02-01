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

function AddDomainModal() {
  const [addDomain,setAddDomain] = useState()
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
    axios.post('http://127.0.0.1:8000/register_domain/',{
      domain:addDomain
    })
    .then((response)=>{
      console.log(response.data)
      setAddDomain(null)
    }).catch((error)=>{
      alert(error.message)
    })
  }

  return (
    <div>
      <span type='button' onClick={()=>{handleOpen()}}>
      <AddIcon sx={{color:"white"}}/>
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
            <TextField id="add-batch" label="Add Domain" variant="standard" 
            value={addDomain} onChange={(e)=>setAddDomain(e.target.value)}/>
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

export default AddDomainModal