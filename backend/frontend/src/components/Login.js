import { useNavigate } from "react-router-dom";
import { useState,useContext,useEffect } from 'react';
import {AuthContext} from '../AuthContext';
import jwt_decode from "jwt-decode";
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
import Alert from '@mui/material/Alert'

const theme = createTheme()

export default function Login() {
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const navigate = useNavigate()
    const [error,setError] = useState('')
    let{authTokens,setUser,setAuthTokens}=useContext(AuthContext)
    useEffect(() => {
      if(authTokens){
        console.log('sorry',jwt_decode(authTokens.access).is_superuser);
        if (jwt_decode(authTokens.access).is_superuser){
          navigate('/admin_home')
      }
      else if(jwt_decode(authTokens.access).is_advisor){
          navigate('/advisor_home')
      }
      else if(jwt_decode(authTokens.access).is_reviewer){
        navigate('/reviewer_home')
      }
      else if(jwt_decode(authTokens.access).is_superuser === false && jwt_decode(authTokens.access).is_advisor === false && jwt_decode(authTokens.access).is_reviewer === false ){
      navigate('/home')
      }
      }
  },[]);
    const loginHandler=async(e)=>{
        e.preventDefault()
        let details = {username,password}
        console.log('ki',username,password);
        let response = await fetch('http://localhost:8000/token',{
      
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            
        },
        
        credentials: 'include',
        body: JSON.stringify({
            'username': username,
            'password': password
        })
        
    })
  let data = await response.json()
  console.log('data',data);
  console.log('response',response);
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
    }
  }else{
      setError('Invalid Credentials')
  }

    }
    return (
        <div className='container'>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <div className="h1 text-success">BrosApp</div></Box>
     <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={loginHandler} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Username"
              name="email"
              autoComplete="email"
              autoFocus
              onClick={(e)=>{setError('')}} onChange={(e)=>setUsername(e.target.value)}

            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onClick={(e)=>{setError('')}} onChange={(e)=>setPassword(e.target.value)}
            />
            {error ?
      <Alert variant="filled" severity="error">
       {error}
      </Alert>:''}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
</div>
  );
}