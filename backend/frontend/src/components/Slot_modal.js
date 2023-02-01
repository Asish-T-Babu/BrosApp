import React,{useState,useContext,useEffect} from 'react'
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { PostContext } from '../context';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {AuthContext} from '../AuthContext';
import jwt_decode from "jwt-decode";


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

function Slot_modal({data}) {
  const {time,setTime}=useContext(PostContext)
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [company, setCompany] = React.useState('');
  const [select, setSelect] = React.useState([]);
  
  const handleChange = (event) => {
    setCompany(event.target.value);
  };
  let {authTokens}=useContext(AuthContext)
    const authAxios = axios.create({
      baseURL:'http://127.0.0.1:8000',
      headers:{
        Authorization:`Bearer ${authTokens.access}`
      },
    });
  // const handleSubmit=(e)=>{
  //   e.preventDefault()
  //   console.log("hi, how are you")
  //   // axios.get('http://127.0.0.1:8000/view_company').then((response)=>{
  //     axios.get(`http://127.0.0.1:8000/view_time_reviewer/${jwt_decode(authTokens.access).user_id}`)
  //     .then((response)=>{
  //     setTime(response.data.reviewer_time)
  //   }).catch((error)=>{
  //     alert(error.message)
  //   })
  // }
  const handleSubmits=()=>{
    axios.post('http://127.0.0.1:8000/register_time',{
      user:jwt_decode(authTokens.access).user_id,
      time:{data}.data
    })
    .then((response)=>{
      console.log(response.data)
      setTime(!(time))
    }).catch((error)=>{
      alert(error.message)
    })
  }

  return (
    <div>
      <Button type='button' onClick={()=>{handleOpen()}}>
      <Box
         sx={{
            
             width: 200,
             height: 200,
             display: 'flex',
             justifyContent: 'center',
             alignItems: 'center',
             backgroundColor: 'primary.dark',
             '&:hover': {
                 backgroundColor: 'primary.main',
                 opacity: [0.9, 0.8, 0.7]
                },
            }}
            ><h6 style={{color:"white"}}>{data}</h6></Box>
      </Button>
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
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
            Are tou sure, You are available at&nbsp;&nbsp; {data}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            {/* <Button variant="contained" onClick={(e)=>{handleSubmit(e);handleClose()}} sx={{ mt: 3, ml: 1 }}>{'Approve'}</Button> */}
            <Button variant="contained" onClick={(e)=>{handleSubmits();handleClose()}}sx={{ mt: 3, ml: 1 }}>{'Approve'}</Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
    </div>
  )
}

export default Slot_modal