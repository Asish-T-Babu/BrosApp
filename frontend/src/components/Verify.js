import axios from 'axios'
import React,{useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Box from '@mui/material/Box';
import { Button, Grid } from '@mui/material'
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';

function Verify() {
 const navigate = useNavigate()
 const [verified,setVerified] = useState('')
 const {id,username} = useParams()


 const verify1 = ()=>{
    let item = {id:id,username:username}
    console.log('ver',item)
    axios.post("http://localhost:8000/validate",item).then((response)=>{
        console.log('verifuuuu',response.data)
        setVerified(response.data)
    })
 }


 useEffect(()=>{
    verify1()
 },[])
  return (
    <div>
        <Grid sx={{ marginTop: 5,display:'flex',justifyContent:'center',alignItems:'center'}}>
        <Card sx={{ display: 'flex',height:500,borderRadius:4,width:600,backgroundColor:'yellowgreen'}}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Grid sx={{display:'flex',justifyContent:'center',alignItems:'center'}}>
        <CardContent sx={{ flex: '1 0 auto',p:18,marginLeft:5}} >
          <h3>Verified Succesfully</h3>
          <Grid className='container' sx={{marginTop:'50px',}}>
          <center><i className="fas fa-check-circle" style={{fontSize: '72px',marginBottom: '20px',color: '#28A745'}}></i></center>
          </Grid>
          <Button onClick={()=>navigate('/')}>Login Now</Button>
        </CardContent>
        </Grid>

</Box>
</Card>
</Grid>
    </div>
  )
}

export default Verify