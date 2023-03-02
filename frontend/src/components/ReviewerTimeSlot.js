import React,{useContext,useEffect,useState} from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Slot_modal from './Slot_modal';
import { PostContext } from '../context';
import axios from 'axios';
import {AuthContext} from '../AuthContext';
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import ReviewerDrawer from "./ReviewerDrawer";

export default function ReviewerTimeSlot() {
  let {time}=useContext(PostContext)
  const [book,setBook] = useState([])
  let {authTokens}=useContext(AuthContext)
  const navigate = useNavigate()
  const slot = ["9:00AM - 10:00AM","10:00AM - 11:00AM","11:00AM - 12:00pmM","12:00pm - 1:00pm","1:00pm - 2:00pm","2:00pm - 3:00pm","3:00pm - 4:00pm","4:00pm - 5:00pm","5:00pm - 6:00pm","6:00pm - 7:00pm","7:00pm - 8:00pm","8:00pm - 9:00pm"]
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/view_time_reviewer/${jwt_decode(authTokens.access).user_id}`).then((response)=>{
      setBook(response.data)
    })
},[time])
  return (
    <><div className="flex">
    <ReviewerDrawer data={"time"}/>
    <div style={{padding:40}}>
      <Grid container spacing={6}> 
      {slot.map((row,index) => {
        let obj = book.find(o => o.time === {row}.row);
        console.log(obj);
        if(typeof(obj)=='object' && obj.whoBook!=null){
          return (
            <Grid item xs={6} lg={2}>
             <Box
             sx={{
                
                width: 200,
                height: 200,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                 backgroundColor: 'lightGreen',
                }}
                ><h6 style={{color:"white"}}>{row}</h6></Box>
            </Grid>)
            }
        else if(typeof(obj)=='object'){
              return (
                
                <Grid item xs={6} lg={2}>
                 <Box
                 sx={{
                    
                    width: 200,
                    height: 200,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                     backgroundColor: 'secondary.dark',
                    }}
                    ><h6 style={{color:"white"}}>{row}</h6></Box>
                </Grid>)
            }
            else{
            return (
              <Grid item xs={6} lg={2}>
      
               <Slot_modal data={row}/>
              </Grid>
                  )}
            })}
      </Grid>
    </div>
    </div>
  </>
  );
}