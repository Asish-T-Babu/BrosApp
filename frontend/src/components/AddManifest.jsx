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
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from 'react-hook-form'
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { PostContext } from '../context';

function AddManifest() {
  let{manifest,addRowManifest,setAddManifestDisplay}=useContext(PostContext)
  let id  = useParams();
  const { register, handleSubmit, formState: { errors } }=useForm()
  let navigate = useNavigate() 
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
  console.log(manifest.id);
//   useEffect(() => {
//     axios.get('http://127.0.0.1:8000/view_batch')
//     .then((response)=>{
//       setSelect(response.data)
//       console.log(response.data)
//     }).catch((error)=>{
//       alert(error.message)
//     })
// },[]);
  const handleSubmits=(e)=>{
    console.log(e)
    axios.post('http://127.0.0.1:8000/add_week',{
      user:manifest,
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
      setAddManifestDisplay(!(true))
      
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
  console.log(errors)
  const theme = createTheme();

  return (
<Grid container className='overflow-x-scroll w-100 h-100 overflow-y-scroll' sx={{backgroundColor:"white"}} >
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
        {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar> */}
        <Typography component="h1" variant="h5">
          Add Week
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit((e)=>handleSubmits(e))} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
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
            {/* <Grid item xs={12}>
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
            </Grid> */}
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
            Submit
          </Button>
          <Grid container justifyContent="flex-end">
            {/* <Grid item>
              <Link href="/" variant="body2">
                Close
              </Link>
            </Grid> */}
          </Grid>
        </Box>
      </Box>
    </Container>
  </ThemeProvider>
  </Grid>
  )
}

export default AddManifest
