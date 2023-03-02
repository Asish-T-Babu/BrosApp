import React,{useState,useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import ReviewerDrawer from "../../components/ReviewerDrawer";
import TemporaryDrawer from "../../components/TemporaryDrawer";
import AdvisorDrawer from "../../components/AdvisorDrawer";
import StudentDrawer from "../../components/StudentDrawer";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useForm } from 'react-hook-form'
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {AuthContext} from '../../AuthContext';
import jwt_decode from "jwt-decode";


function HomePage() {
    const [roomCode,setRoomCode]=useState('')
    const navigate = useNavigate();
    const theme = createTheme();
    let{authTokens,setUser,setAuthTokens}=useContext(AuthContext)
    
    let a=jwt_decode(authTokens.access).is_superuser
    let b=jwt_decode(authTokens.access).is_reviewer
    let c=jwt_decode(authTokens.access).is_advisor
    if(!a && !b && !c){
      var d=true
    }
    console.log(b,a,c);
    const { register, handleSubmit, formState: { errors } }=useForm()
    const handleFormSubmit=(e)=>{
        navigate(`/room/${roomCode}`);
    }
    
  return (
    <div className="flex">
      {/* {manifest_display?
            editManifestBoolean?
            <Edit_manifest/>
            :addRowManifest?
            <AddManifest/>
            :<BasicTable/>
          :
          null} */}
      {b? <ReviewerDrawer data={"meet"}/> : null}
      {a? <TemporaryDrawer data={"meet"}/> : null}
      {c? <AdvisorDrawer data={"meet"}/> : null}
      {d? <StudentDrawer data={"meet"}/>:null}
      {/* if ({jwt_decode(authTokens.access).is_superuser}){
        
      }esle if({jwt_decode(authTokens.access).is_reviewer}){
        
      } */}
          
    <div className='home-page' style={{width:'100%'}}>
      {/* <form onSubmit={handleFormSubmit} className='form'>
        <div>
            <label>Enter Room Code</label>
            <input value={roomCode} onChange={(e)=>setRoomCode(e.target.value)} type="text" required placeholder="Enter Room Code" />
        </div>
        <button type='submit'>Enter Room</button>
      </form> */}
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
          <Box component="form" onSubmit={handleSubmit((e)=>handleFormSubmit(e))} noValidate sx={{ mt: 1 }}>
            <Grid>
            <TextField
              margin="normal"
              required
              fullWidth
              id="roomCode"
              label="Enter Room Code"
              name="roomCode"
              autoFocus
              {...register('roomCode',{ required:true})}
              value={roomCode} onChange={(e)=>setRoomCode(e.target.value)}
            />
            {errors.roomCode && <div>This field is required</div>}
         </Grid>
         
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Enter Room
            </Button>
            
          </Box>
          </Box>
          </Container>
     </ThemeProvider>
    </div>
    </div>
  )
}

export default HomePage



// function Copyright(props) {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center" {...props}>
//       {'Copyright © '}
//       <Link color="inherit" href="https://mui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

// const theme = createTheme();

// const handleFormSubmit=(e)=>{
//   e.preventDefault();
//   navigate(`/room/${roomCode}`);
// }

//   return (
//     <ThemeProvider theme={theme}>
//       <Container component="main" maxWidth="xs">
//         <CssBaseline />
//         <Box
//           sx={{
//             marginTop: 8,
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//           }}
//         >
//           <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
//             <LockOutlinedIcon />
//           </Avatar>
//           <Typography component="h1" variant="h5">
//             Sign in
//           </Typography>
//           <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               id="email"
//               label="Email Address"
//               name="email"
//               autoComplete="email"
//               autoFocus
//             />
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               name="password"
//               label="Password"
//               type="password"
//               id="password"
//               autoComplete="current-password"
//             />
//             <FormControlLabel
//               control={<Checkbox value="remember" color="primary" />}
//               label="Remember me"
//             />
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               sx={{ mt: 3, mb: 2 }}
//             >
//               Sign In
//             </Button>
//             <Grid container>
//               <Grid item xs>
//                 <Link href="#" variant="body2">
//                   Forgot password?
//                 </Link>
//               </Grid>
//               <Grid item>
//                 <Link href="#" variant="body2">
//                   {"Don't have an account? Sign Up"}
//                 </Link>
//               </Grid>
//             </Grid>
//           </Box>
//         </Box>
//         <Copyright sx={{ mt: 8, mb: 4 }} />
//       </Container>
//     </ThemeProvider>
//   );
// }