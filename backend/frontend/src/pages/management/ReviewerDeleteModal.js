import React,{useContext} from 'react'
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { PostContext } from '../../context';
import {AuthContext} from '../../AuthContext';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

function ReviewerDeleteModal(props) {
  const {reviewerDeleteModalBoolean,setReviewerDeleteModalBoolean} = useContext(PostContext)
  const [open, setOpen] = React.useState(false);
    
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  let {authTokens}=useContext(AuthContext)
    // const authAxios = axios.create({
    //   baseURL:'http://127.0.0.1:8000',
    //   headers:{
    //     Authorization:`Bearer ${authTokens.access}`
    //   },
    // });
    
  const handleSubmit=(e)=>{
    e.preventDefault()
    axios.delete(`http://127.0.0.1:8000/reviewer_delete/${props.data.id}`).then((response)=>{
      console.log(response.data)
      setReviewerDeleteModalBoolean(!(reviewerDeleteModalBoolean))
    }).catch((error)=>{
      alert(error.message)
    })
  }
  
  return (
    <div><Button variant="contained" color="error" onClick={handleOpen}>Delete</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
             Do you want to Approve 
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained" onClick={(e)=>{handleSubmit(e);handleClose()}} sx={{ mt: 3, ml: 1 }}>{'Approve'}</Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}

export default ReviewerDeleteModal