import React,{useEffect,useContext} from 'react';                                                         
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import { PostContext } from '../../context';
import BatchDeleteModal from './BatchDeleteModal';
import AddBatchModal from '../../components/AddBatchModal'

export default function Batch_view() {
    const[batch,setBatch]=React.useState([])
  const {BatchDeleteModalBoolean} = useContext(PostContext)
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/view_all_batch').then((response)=>{
          setBatch(response.data)
        })
    },[BatchDeleteModalBoolean])
  return (
  <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
  <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell><AddBatchModal/> </TableCell>
            <TableCell>Batch</TableCell>
            <TableCell>Batch Advisor</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Update</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {batch.map((row,index) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
            <TableCell>{index+1}</TableCell>
              <TableCell component="th" scope="row">
                {row.batch}
              </TableCell>
              <TableCell>{row.batch_advisor}</TableCell>
              <TableCell>{row.location}</TableCell>
              <TableCell>{row.date}</TableCell>
              <TableCell><BatchDeleteModal data={row}/></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
</Container>

  );
}