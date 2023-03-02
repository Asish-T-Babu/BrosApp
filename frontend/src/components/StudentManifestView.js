import React, {useState,useEffect, useContext} from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {AuthContext} from '../AuthContext';
import { PostContext } from '../context';
import Grid from '@mui/material/Grid';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import StudentDrawer from './StudentDrawer'

export default function StudentManifestView() {
    let {authTokens}=useContext(AuthContext)
    const user =jwt_decode(authTokens.access).user_id
    const {rows,setRows} = useState()
    let{manifest,addRowManifest,setAddManifestDisplay,editManifest,setEditManifest,setEditManifestBoolean}=useContext(PostContext)
    const navigate = useNavigate()
    const [select, setSelect] = useState([]);
    
    // const authAxios = axios.create({
    //   baseURL:'http://127.0.0.1:8000',
    //   headers:{
    //     Authorization:`Bearer ${authTokens.access}`
    //   },
    // });
    useEffect(() => {
      axios.get(`http://127.0.0.1:8000/view_manifest/${user}`,{
      }).then((response)=>{
        console.log(response.data)
        setSelect(response.data.user_manifest)
      }).catch((error)=>{
        alert(error.message)
      })
    },[manifest])
    console.log("hi",manifest);

  return (
  <div className="flex">
  <StudentDrawer data={"left"}/>
    <div className="flex flex-col overflow-y-scroll w-100">
              
    <Grid container className='overflow-x-scroll w-100 h-100 overflow-y-scroll' >
      <TableContainer component={Paper} >
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell sx={{minWidth:"100px",maxWidth:"100px"}}>Week</TableCell>
            <TableCell sx={{minWidth:"250px",maxWidth:"250px"}}>Status</TableCell>
            <TableCell sx={{minWidth:"400px",maxWidth:"400px"}}>Project Updation</TableCell>
            
            <TableCell sx={{minWidth:"400px",maxWidth:"400px"}}>Next Week Task</TableCell>
            <TableCell sx={{minWidth:"200px",maxWidth:"200px"}}>Reviewer name</TableCell>
            <TableCell sx={{minWidth:"200px",maxWidth:"200px"}}>Advisor Name</TableCell>
            <TableCell sx={{minWidth:"100px",maxWidth:"100px"}}>Score</TableCell>
            <TableCell sx={{minWidth:"400px",maxWidth:"400px"}}>Extra Workouts Review</TableCell>
            <TableCell sx={{minWidth:"300px",maxWidth:"300px"}}>Extra Workouts Score</TableCell>
            <TableCell sx={{minWidth:"250px",maxWidth:"250px"}}>English Review</TableCell>
            <TableCell sx={{minWidth:"200px",maxWidth:"200px"}}>English Score</TableCell>
            <TableCell sx={{minWidth:"100px",maxWidth:"100px"}}>Total</TableCell>
            <TableCell sx={{minWidth:"150px",maxWidth:"150px"}}>Star Rating</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {select.map((man) => {return(
          <TableRow
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
               <TableCell sx={{minWidth:"100px",maxWidth:"100px"}}>{man.week}</TableCell>
               <TableCell sx={{minWidth:"250px",maxWidth:"250px"}}>{man.status}</TableCell>
               <TableCell sx={{minWidth:"400px",maxWidth:"400px"}}>{man.project_updation}</TableCell>
               <TableCell sx={{minWidth:"400px",maxWidth:"400px"}}>{man.next_week_task}</TableCell>
               <TableCell sx={{minWidth:"200px",maxWidth:"200px"}}>{man.reviewer_name}</TableCell>
               <TableCell sx={{minWidth:"200px",maxWidth:"200px"}}>{man.advisor_name}</TableCell>
               <TableCell sx={{minWidth:"100px",maxWidth:"100px"}}>{man.techinical_score}</TableCell>
               <TableCell sx={{minWidth:"400px",maxWidth:"400px"}}>{man.extra_workouts_review}</TableCell>
               <TableCell sx={{minWidth:"300px",maxWidth:"300px"}}>{man.extra_workouts_score}</TableCell>
               <TableCell sx={{minWidth:"250px",maxWidth:"250px"}}>{man.english_review}</TableCell>
               <TableCell sx={{minWidth:"200px",maxWidth:"200px"}}>{man.english_score}</TableCell>
               <TableCell sx={{minWidth:"100px",maxWidth:"100px"}}>{man.total_score}</TableCell>
               <TableCell sx={{minWidth:"150px",maxWidth:"150px"}}>{man.star_rating}</TableCell>
             </TableRow>
              )})}

        </TableBody>
      </Table>
    </TableContainer>
    </Grid></div></div>
  );
}