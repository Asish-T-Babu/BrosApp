// import * as React from 'react';
// import Button from '@mui/joy/Button';
// import FormControl from '@mui/joy/FormControl';
// import FormLabel from '@mui/joy/FormLabel';
// import Input from '@mui/joy/Input';
// import Modal from '@mui/joy/Modal';
// import ModalDialog from '@mui/joy/ModalDialog';
// import Stack from '@mui/joy/Stack';
// import Add from '@mui/icons-material/Add';
// import Typography from '@mui/joy/Typography';

// export default function BasicModalDialog() {
//   const [open, setOpen] = React.useState(false);
//   return (
//     <React.Fragment>
//       <Button
//         variant="outlined"
//         color="neutral"
//         startDecorator={<Add />}
//         onClick={() => setOpen(true)}
//       >
//         New project
//       </Button>
//       <Modal open={open} onClose={() => setOpen(false)}>
//         <ModalDialog
//           aria-labelledby="basic-modal-dialog-title"
//           aria-describedby="basic-modal-dialog-description"
//           sx={{ maxWidth: 500 }}
//         >
//           <Typography id="basic-modal-dialog-title" component="h2">
//             Create new project
//           </Typography>
//           <Typography id="basic-modal-dialog-description" textColor="text.tertiary">
//             Fill in the information of the project.
//           </Typography>
//           <form
//             onSubmit={(event) => {
//               event.preventDefault();
//               setOpen(false);
//             }}
//           >
//             <Stack spacing={2}>
//               <FormControl>
//                 <FormLabel>Name</FormLabel>
//                 <Input autoFocus required />
//               </FormControl>
//               <FormControl>
//                 <FormLabel>Description</FormLabel>
//                 <Input required />
//               </FormControl>
//               <Button type="submit">Submit</Button>
//             </Stack>
//           </form>
//         </ModalDialog>
//       </Modal>
//     </React.Fragment>
//   );
// }

import { useState,useContext,useEffect } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import axios from 'axios'
import {AuthContext} from '../AuthContext';
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import React from 'react'



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

export default function TransitionsModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate()

  const [phone,setPhone]= React.useState()
  const [otp,setOtp]= React.useState()
  const [success,setSuccess]= React.useState(false)
  let{setUser,setAuthTokens}=useContext(AuthContext)
  React.useEffect(()=>{
    setSuccess(false)
  },[])
  const handlesubmit=(e)=>{
    axios.post('http://127.0.0.1:8000/otplogin',{
      phone:phone
    }).then((response)=>{
        
      alert(response.data)
      console.log(response.data)
      if (response.data=="OTP sended successfully"){
        setSuccess(true)
      }
    }).catch((error)=>{
      alert(error.message)
    })
  }
  const handlesubmits=(e)=>{
    axios.post('http://127.0.0.1:8000/otp_verify',{
      otp:otp,
      phone:phone
    }).then((response)=>{
      console.log(response)
      
        let data =response.data
      if (response.status===200) {
        setAuthTokens(data)
        setUser(jwt_decode(data.access))
        localStorage.setItem('authTokens',JSON.stringify(data));
          console.log("perfect",jwt_decode(data.access).is_superuser)
        if (jwt_decode(data.access).is_superuser){
          navigate('/admin_home')
      }
      else if(jwt_decode(data.access).is_advisor){
          navigate('/advisor_home')
      }
      else if(jwt_decode(data.access).is_reviewer){
        navigate('/reviewer_home')
      }
      else if(jwt_decode(data.access).is_superuser === false && jwt_decode(data.access).is_advisor === false && jwt_decode(data.access).is_reviewer === false ){
      navigate('/home')
      }}
      setOtp('')
      setPhone('')
    }).catch((error)=>{
      alert(error.message)
    })
  }
  if(success===false){
  return (
    <div>
      <span onClick={handleOpen}>Login with OTP</span>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
                Enter your Phone Number
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                <TextField id="outlined-basic" label="phone" variant="outlined" style={{width:"100%"}} onChange={(e)=>setPhone(e.target.value)} value={phone}/>{console.log(phone)}
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                <Button variant="contained"  style={{width:"100%"}} onClick={handlesubmit}>Submit</Button>
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  )}
  else{
    return (
        <div>
          <span onClick={handleOpen}>Login with OTP</span>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
              backdrop: {
                timeout: 500,
              },
            }}
          >
            <Fade in={open}>
              <Box sx={style}>
                <Typography id="transition-modal-title" variant="h6" component="h2">
                    Enter the OTP
                </Typography>
                <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                    <TextField id="outlined-basic" label="OTP" variant="outlined" style={{width:"100%"}} onChange={(e)=>setOtp(e.target.value)} value={otp}/>{console.log(phone)}
                </Typography>
                <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                    <Button variant="contained"  style={{width:"100%"}} onClick={handlesubmits}>Submit</Button>
                </Typography>
              </Box>
            </Fade>
          </Modal>
        </div>
      )}
}