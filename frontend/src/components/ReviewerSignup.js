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

function ReviewerSignup() {
  let navigate = useNavigate() 
  const [name,setName]=useState('')
  const [username,setUsername]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [phone,setPhone]=useState('')
  const [select, setSelect] = React.useState([]);
  const [company, setCompany] = React.useState('');
  const { register, handleSubmit, formState: { errors } }=useForm()
  const handleChange = (event) => {
    setCompany(event.target.value);
  };
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/view_domain')
    .then((response)=>{
      setSelect(response.data)
      console.log(response.data)
    }).catch((error)=>{
      alert(error.message)
    })
},[]);
  const handleSubmits=(e)=>{
    console.log(e)
    axios.post('http://127.0.0.1:8000/admin_register',{
      first_name:name,
      username:username,
      phone:phone,
      email:email,
      password:password,
      domain:company,
      is_reviewer:true
    }).then((response)=>{
      console.log(response.data)
      setPhone('')
      setName('')
      setUsername('')
      setEmail('')
      setPassword('')
      setCompany('')
      navigate('/')
    }).catch((error)=>{
      alert(error.message)
    })
  }
  console.log(errors)
  const theme = createTheme();
  
  return (
    
    <div className="w-100 h-100 overflow-hidden bg-white">
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
          Add Reviewer
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
            <Grid item xs={12}>
            <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Domain</InputLabel>
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
                <MenuItem value={sel.domain}>{sel.domain}</MenuItem>
              ))}
              </Select>
              </FormControl>
               {errors.email && <span>This field is required</span>}
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
        </Box>
      </Box>
    </Container>
  </ThemeProvider>
  </div>
  )
}

export default ReviewerSignup
