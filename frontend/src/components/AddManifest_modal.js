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
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useForm } from 'react-hook-form'
import CssBaseline from '@mui/material/CssBaseline';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };

function AddDomainModal() {
  const [addDomain,setAddDomain] = useState()
  const { register, handleSubmit, formState: { errors } }=useForm()
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [week,setWeek]=useState()
  const [status,setUStatus]=useState()
  const [nextWeekTask,setNextWeekTask]=useState()
  const [reviewername,setReviewerName]=useState()
  const [advisorName,setAdvisorName]=useState()
  const [projectUpdation, setProjectUpdation] = useState();
  const [techinicalScore, setTechinicalScore] = useState();
  const [extraWorkoutsReview,setExtraWorkoutsReview]=useState()
  const [extraWorkoutsScore,setExtraWorkoutsScore]=useState()
  const [englishReview,setEnglishReview]=useState()
  const [englishScore,setEnglishScore]=useState()
  const handleChange = (event) => {
    setUStatus(event.target.value);
  };
  let {authTokens}=useContext(AuthContext)
    const authAxios = axios.create({
      baseURL:'http://127.0.0.1:8000',
      headers:{
        Authorization:`Bearer ${authTokens.access}`
      },
    });
    const handleSubmits=(e)=>{
        console.log(e)
        axios.post('http://127.0.0.1:8000/add_week',{
          // user:Number(id.id),
          week:week,
          status:status,
          project_updation:projectUpdation,
          next_week_task:nextWeekTask,
          reviewer_name:reviewername,
          advisor_name:advisorName,
          techinical_score:techinicalScore,
          extra_workouts_review:extraWorkoutsReview,
          extra_workouts_score:extraWorkoutsScore,
          english_review:englishReview,
          english_score:englishScore,
        }).then((response)=>{
          console.log(response.data)
          setWeek(null)
          setUStatus(null)
          setNextWeekTask(null)
          setReviewerName(null)
          setAdvisorName(null)
          setProjectUpdation(null)
          setTechinicalScore(null)
          setExtraWorkoutsReview(null)
          setExtraWorkoutsScore(null)
          setEnglishReview(null)
          setEnglishScore(null)
        }).catch((error)=>{
          alert(error.message)
        })
      }
      const theme = createTheme();
  return (
    <div>
      <span type='button' onClick={()=>{handleOpen()}}>
      <AddIcon sx={{color:"black"}}/>
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
          
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit((e)=>handleSubmits(e))} sx={{ mt: 3 }}>
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="given-name"
                      name="week" 
                      fullWidth
                      id="week"
                      label="Week"
                      autoFocus
                      {...register('week',{ required:true})}
                      value={week} onChange={(e)=>setWeek(e.target.value)}
                    />
                    {errors.name && <span>This field is required</span>}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Status</InputLabel>
                    <Select
                      fullWidth
                      labelId="demo-simple-select-label"
                      id="status"
                      label="Status"
                      name="status"
                      autoComplete="status"
                      value={status} onChange={handleChange}
                    >
                      <MenuItem value="Green">Green</MenuItem>
                      <MenuItem value="Yellow">Yellow</MenuItem>
                      <MenuItem value="Orange">Orange</MenuItem>
                      <MenuItem value="Red">Red</MenuItem>
                    </Select>
                    </FormControl>
                  </Grid>
                  
                  <Grid item xs={12}>
                    <TextField
                      multiline
                      fullWidth
                      id="project_updation"
                      label="Project Updation"
                      name="project_updation"
                      value={projectUpdation} onChange={(e)=>setProjectUpdation(e.target.value)}
                    />
                  </Grid>
                
                  <Grid item xs={12} xl={40}>
                    <TextField
                      required
                      multiline
                      fullWidth
                      name="next_week_task"
                      label="Next Week Task"
                      type="Next Week Task"
                      id="next_week_task"
                      value={nextWeekTask} onChange={(e)=>setNextWeekTask(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="reviewer_name" 
                      fullWidth
                      id="reviewer_name"
                      label="Reviewer name"
                      value={reviewername} onChange={(e)=>setReviewerName(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="advisor_name" 
                      required
                      fullWidth
                      id="advisor_name"
                      label="Advisor Name"
                      value={advisorName} onChange={(e)=>setAdvisorName(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                    multiline
                      name="score" 
                      required
                      fullWidth
                      id="score"
                      label="Score"
                      value={techinicalScore} onChange={(e)=>setTechinicalScore(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                    multiline
                      name="extra_workouts_review" 
                      required
                      fullWidth
                      id="extra_workouts_review"
                      label="Extra Workouts Review"
                      value={extraWorkoutsReview} onChange={(e)=>setExtraWorkoutsReview(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="extra_workouts_score" 
                      required
                      fullWidth
                      id="extra_workouts_score"
                      label="Extra Workouts Score"
                      value={extraWorkoutsScore} onChange={(e)=>setExtraWorkoutsScore(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                    multiline
                      name="english_review" 
                      required
                      fullWidth
                      id="english_review"
                      label="English Review"
                      value={englishReview} onChange={(e)=>setEnglishReview(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="english_score" 
                      fullWidth
                      id="english_score"
                      label="English Score"
                      value={englishScore} onChange={(e)=>setEnglishScore(e.target.value)}
                    />
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
          </Box>
        </Fade>
      </Modal>
    </div>
    </div>
  )
}

export default AddDomainModal