// import Profile from './OurProfile';
// import * as React from 'react';
// import Backdrop from '@mui/material/Backdrop';
// import Box from '@mui/material/Box';
// import Modal from '@mui/material/Modal';
// import Fade from '@mui/material/Fade';
// import Button from '@mui/material/Button';
// import {chat4} from '../../assets/whatsapp'
// import {AuthContext} from '../../AuthContext';
// import jwt_decode from "jwt-decode";
// import axios from 'axios'

// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 300,
//   bgcolor: 'background.paper',
//   boxShadow: 24,
//   p: 4,
// };
// export default function TransitionsModal() {
//   const [open, setOpen] = React.useState(false);
//   const [user, setUser] = React.useState();
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);
//   let{authTokens}=React.useContext(AuthContext)
//   React.useEffect(()=>{
//     axios.get(`http://127.0.0.1:8000/view_profile/${(jwt_decode(authTokens.access).user_id)}`).then((response) => {
//       setUser(response.data)
//     })
//   },[])
//   return (
//     <div>
//       <Button onClick={handleOpen}>
//           {/* Profile picture */}
//           <img
//             src={chat4}
//             alt="profile_picture"
//             className="rounded-full w-[45px] h-[45px] mr-5"
//           />

//           {/* Info */}
//           </Button>
//       <Modal
//         aria-labelledby="transition-modal-title"
//         aria-describedby="transition-modal-description"
//         open={open}
//         onClose={handleClose}
//         closeAfterTransition
//         BackdropComponent={Backdrop}
//         BackdropProps={{
//           timeout: 500,
//         }}
//       >
//         <Fade in={open}>
//           <Box sx={style}>
//             <div>
//               <Profile profile={user} />
//               <button className='btn btn-dark'>Edit</button>
//             </div>
//           </Box>
//         </Fade>
//       </Modal>
//     </div>
//   );
// }

import Profile from './OurProfile';
import {AuthContext} from '../../AuthContext';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import {chat4} from '../../assets/whatsapp'
import jwt_decode from "jwt-decode";
import axios from 'axios'

import React,{useState,useContext,useEffect} from 'react';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

function ChildModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  let navigate = useNavigate() 
  const [name,setName]=useState('')
  const [username,setUsername]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [select, setSelect] = React.useState([]);
  const [company, setCompany] = React.useState('');
  const { register, handleSubmit, formState: { errors } }=useForm()
  let{authTokens}=React.useContext(AuthContext)
  const [user, setUser] = React.useState('');
  React.useEffect(()=>{
    axios.get(`http://127.0.0.1:8000/view_profile/${(jwt_decode(authTokens.access).user_id)}`).then((response) => {
      setUser(response.data)
    })
  },[])
const[photo,setPhoto]=useState()
  const handleChange = (event) => {
    setCompany(event.target.value);
  };
  // function handleSubmit() {
  //   const formData =new FormData()
  //   formData.append("photo",photo)
  //   axios.put(`http://127.0.0.1:8000/update_profile/${(jwt_decode(authTokens.access).user_id)}`,formData).then((res)=>{
  //       console.log(res.data)
  //   }).catch(err=>{
  //       console.log(err)
  //   })
    
// }
  const handleSubmits=(e)=>{
    console.log(username)
    const formData =new FormData()
    formData.append("first_name",name)
    formData.append("username",username)
    formData.append("email",email)
    formData.append("photo",photo)
    axios.put(`http://127.0.0.1:8000/update_profile/${(jwt_decode(authTokens.access).user_id)}`,formData).then((response)=>{
      console.log(response.data)
      setName('')
      setUsername('')
      setEmail('')
      handleClose()
    }).catch((error)=>{
      alert(error.message)
    })
  }
  return (
    <React.Fragment>
      {/* <Button onClick={handleOpen}>Open Child Modal</Button> */}
      
      <button className='btn btn-dark' onClick={handleOpen}>Edit</button>
      <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        {/* <Box sx={{ ...style, width: 200 }}> */}
        <Box component="form" noValidate onSubmit={handleSubmit((e)=>handleSubmits(e))} sx={{ mt: 3,...style, width: 350 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} >
              <TextField
                autoComplete="given-name"
                name="name" 
                required
                fullWidth
                id="name"
                label="Name"
                autoFocus
                {...register('name',{ required:true})}
                defaultValue={user.first_name} onChange={(e)=>setName(e.target.value)}
              />
               {errors.name && <span>This field is required</span>}
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="username"
                label="User Name"
                name="username"
                {...register('username',{ required:true })}
                defaultValue={user.username} onChange={(e)=>setUsername(e.target.value)}
                
              />
            {errors.username && <span>This field is required</span>}
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                {...register('email',{ required:true,pattern:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i })}
                defaultValue={user.email} onChange={(e)=>setEmail(e.target.value)}
              />
               {errors.email && <span>This field is required</span>}
            </Grid>
            <Grid item xs={12}>
      <input type="file" onChange={(e)=>{setPhoto(e.target.files[0])}}/>
      </Grid>
          </Grid>
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Button onClick={handleClose}>Close Child Modal</Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

export default function NestedModal() {
  const [open, setOpen] = React.useState(false);
  const [vari,setVari] = React.useState("")
  const [user, setUser] = React.useState('');
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  let{authTokens}=React.useContext(AuthContext)
  React.useEffect(()=>{
    axios.get(`http://127.0.0.1:8000/view_profile/${(jwt_decode(authTokens.access).user_id)}`).then((response) => {
      setUser(response.data)
      setVari(response.data.photo)
    })
  },[])
  
  return (
    <div>
      <Button onClick={handleOpen}>
        {user.photo?<img className="rounded-full w-[45px] h-[45px] mr-5" src={user.photo} alt="image"/>
        :<img
                  src={chat4}
                  alt="profile_picture"
                  className="rounded-full w-[45px] h-[45px] mr-5"
                ></img>}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>      
              <Profile profile={user} imgUrl={vari}/>
          <ChildModal />
        </Box>
      </Modal>
    </div>
  );
}