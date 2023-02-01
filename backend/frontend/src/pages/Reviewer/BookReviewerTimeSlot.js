import React,{useContext,useEffect,useState} from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { PostContext } from '../../context';
import axios from 'axios';
import {AuthContext} from '../../AuthContext';
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import BookReviewerSlotModal from './BookReviewerSlotModal';

export default function BookReviewerTimeSlot() {
  let{reviewerTimeSlotDisplayUser}=useContext(PostContext)
  const [bookSlot,setBookSlot] = useState([])
  let {book,setBook}=useContext(PostContext)
  let {authTokens}=useContext(AuthContext)
  let id={reviewerTimeSlotDisplayUser}.reviewerTimeSlotDisplayUser
  const navigate = useNavigate()
  const slot = ["9:00AM - 10:00AM","10:00AM - 11:00AM","11:00AM - 12:00pmM","12:00pm - 1:00pm","1:00pm - 2:00pm","2:00pm - 3:00pm","3:00pm - 4:00pm","4:00pm - 5:00pm","5:00pm - 6:00pm","6:00pm - 7:00pm","7:00pm - 8:00pm","8:00pm - 9:00pm"]
  useEffect(() => {
    console.log({reviewerTimeSlotDisplayUser}.reviewerTimeSlotDisplayUser)
    axios.get(`http://127.0.0.1:8000/view_time_reviewer/${id}`).then((response)=>{
      setBookSlot(response.data)
    })
},[reviewerTimeSlotDisplayUser,book])
  return (
    <>
    <div style={{padding:40}}>
      <Grid container spacing={6}> 
      {slot.map((row,index) => {
        let obj = bookSlot.find(o => o.time === {row}.row);
        console.log(obj);
        if(typeof(obj)=='object' && obj.whoBook!=null){
          return (
            <Grid item xs={4} lg={3}>
             <Box
             sx={{
                
                width: 200,
                height: 200,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                 backgroundColor: 'primary.light',
                }}
                ><h6 style={{color:"white"}}>{row}</h6></Box>
            </Grid>)
            }
            else if(typeof(obj)=='object'){
              return (
                <Grid item xs={4} lg={3}>
                 <BookReviewerSlotModal data={row}/>
                </Grid>
                    )
                }
            else{
              return (
                <Grid item xs={4} lg={3}>
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
            })}
      </Grid>
    </div>
  </>
  );
}