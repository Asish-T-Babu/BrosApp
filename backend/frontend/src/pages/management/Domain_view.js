import React, { useEffect, useContext } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import AddDomainModal from '../../components/AddDomainModal'
import axios from 'axios';
import { PostContext } from '../../context';
import DomainDeleteModal from './DomainDeleteModal';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function Domain_view() {
  const [batch, setBatch] = React.useState([])
  const { DomainDeleteModalBoolean } = useContext(PostContext)
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/view_domain').then((response) => {
      setBatch(response.data)
    })
  }, [DomainDeleteModalBoolean])
  return (
    <>
    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
    <AddDomainModal/>
    </Box>
    <Grid container sx={{display:'flex',alignItems:'center',justifyContent:'center'}} >
    
      {batch.map((row) => (
        

          <Card sx={{ minWidth: 275,minHeight:80 }}>
            <CardContent>
              <Typography variant="h5" component="div">
              {row.domain}
              </Typography>
              <Typography component="div">
              <DomainDeleteModal data={row}/>
              </Typography>
            </CardContent>
            
          </Card>
        
        
      ))}
    </Grid>
        </>
  );
}
