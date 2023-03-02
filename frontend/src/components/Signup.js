import React,{useState,useContext,useEffect} from 'react';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow:24,
  p:4,
};

function Signup() {
  let navigate = useNavigate() 
  const [name,setName]=useState('')
  const [username,setUsername]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [select, setSelect] = React.useState([]);
  const [company, setCompany] = React.useState('');
  const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () =>setOpen(false);
    const [phone,setPhone]=useState('')
  const { register, handleSubmit, formState: { errors } }=useForm()
  const handleChange = (event) => {
    setCompany(event.target.value);
  };
  function handleCallbackResponse(response){
    console.log("Encoded JWT ID token:" + response.credentials)
  }
  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: "171117388884-jpe4hsjpadu27otie3pr5bvnob8krom4.apps.googleusercontent.com",
      callback: handleCallbackResponse
    });
      google.accounts.id.renderButton(
        document.getElementById("signInDiv"),
        {
          theme:"outlined", size:"large"
        }
      )

    axios.get('http://127.0.0.1:8000/view_batch')
    .then((response)=>{
      setSelect(response.data)
      console.log(response.data)
    }).catch((error)=>{
      alert(error.message)
    })
},[]);
  const handleSubmits=(e)=>{
    console.log(e)
    axios.post('http://127.0.0.1:8000/user_register',{
      first_name:name,
      username:username,
      phone:phone,
      email:email,
      password:password,
      batch:company
    }).then((response)=>{
      console.log(response.data)
      setName('')
      setUsername('')
      setPhone('')
      setEmail('')
      setPassword('')
      setCompany('')
      navigate('/')
      // handleOpen()
    }).catch((error)=>{
      alert(error.message)
    })
  }
  console.log(errors)
  const theme = createTheme();
  
  return (

    <ThemeProvider theme={theme}>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit((e)=>handleSubmits(e))} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="name" 
                required
                fullWidth
                id="name"
                label="Name"
                autoFocus
                {...register('name',{ required:true})}
                value={name} onChange={(e)=>setName(e.target.value)}
              />
               {errors.name && <span>This field is required</span>}
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="username"
                label="User Name"
                name="username"
                {...register('username',{ required:true })}
                value={username} onChange={(e)=>setUsername(e.target.value)}
                
              />
            {errors.username && <span>This field is required</span>}
            </Grid>
              <Grid item xs={12} >
              <TextField
                required
                fullWidth
                id="phone"
                label="Phone Number"
                name="phone"
                {...register('phone',{ required:true })}
                value={phone} onChange={(e)=>setPhone(e.target.value)}
                
              />
            {errors.username && <span>This field is required</span>}
            </Grid>
            <Grid item xs={12}>
            <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Batch</InputLabel>
              <Select
                required
                fullWidth
                labelId="demo-simple-select-label"
                id="batch"
                label="Batch"
                name="batch"
                autoComplete="batch"
                {...register('batch')}
                value={company} onChange={handleChange}
              >
                {select.map((sel) => (
                <MenuItem value={sel.id}>{sel.batch}</MenuItem>
              ))}
              </Select>
              </FormControl>
               {errors.email && <span>This field is required</span>}
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
                value={email} onChange={(e)=>setEmail(e.target.value)}
              />
               {errors.email && <span>This field is required</span>}
            </Grid>
           
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                {...register('password',{ required:true })}
                value={password} onChange={(e)=>setPassword(e.target.value)}
              />
              {errors.password && <span>This field is required</span>}
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
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
            {/* <div id="signInDiv"></div> */}
          </Grid>
        </Box>
      </Box>
      <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" color='green' variant="h5" component="h2">
            Veify Email
          </Typography>
          <Typography id="modal-modal-description" color='grey'  sx={{ mt: 2 }}>
            A link is send to your email.verify your email by clicking on the link to login
          </Typography>
        </Box>
      </Modal>
    </div>
    </Container>
  </ThemeProvider>
  )
}

export default Signup
