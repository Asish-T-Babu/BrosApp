import React,{useEffect,useContext} from 'react';                                                         
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import AdvisorDeleteModal from './AdvisorDeleteModal';
import { PostContext } from '../../context';
import AddIcon from '@mui/icons-material/Add';
import {AuthContext} from '../../AuthContext';


export default function Advisor_view() {
    const[advisor,setAdvisor]=React.useState([])
  const {advisorDeleteModalBoolean,addAdmin,setAddAdmin} = useContext(PostContext)
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/view_advisor').then((response)=>{
          setAdvisor(response.data)
        })
    },[advisorDeleteModalBoolean,addAdmin])
  return (
  <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
  <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell onClick={()=>{setAddAdmin(true)}}><AddIcon/></TableCell>
            <TableCell>Name</TableCell>
            <TableCell>username</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Update</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {advisor.map((row,index) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
            <TableCell>{index+1}</TableCell>
              <TableCell component="th" scope="row">
                {row.first_name}
              </TableCell>
              <TableCell>{row.username}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.phone}</TableCell>
              <TableCell><AdvisorDeleteModal data={row}/></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
</Container>

  );
}