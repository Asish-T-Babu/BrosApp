import React, { useContext, useEffect, useState } from 'react'
import { chat4 } from '../../assets/whatsapp'
import axios from 'axios'
import { AuthContext } from '../../AuthContext';
import jwt_decode from 'jwt-decode'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
function CreateGroup() {
  let { authTokens } = useContext(AuthContext)
  const user = JSON.parse(jwt_decode(authTokens.access).user_id)
  const [members, setMembers] = useState([]);
  const [groupName, setGroupName] = useState();
  const [groupDescription, setGroupDescription] = useState();
  const [selectedOptions, setSelectedOptions] = useState([user]);
  const [photo, setPhoto] = useState()
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [personName, setPersonName] = React.useState([]);


  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/view_chat/${(jwt_decode(authTokens.access).user_id)}`).then((response) => {
      setMembers(response.data)
    })
  }, [])
  const handleChange = (event) => {
    // Get the value of the checkbox that was just changed
    const selectedValue = JSON.parse(event.target.value);
    // let obj = book.find(o => o.time === {row}.row);
    // If the checkbox was checked, add the value to the selected options array
    if (event.target.checked) {
      setSelectedOptions([...selectedOptions, selectedValue]);
    } else {
      // If the checkbox was unchecked, remove the value from the selected options array
      setSelectedOptions(selectedOptions.filter(option => option !== (selectedValue)));

    }
  }
  const handleSubmit = () => {
    const formData = new FormData()
    formData.append("photo", photo)
    axios.post('http://127.0.0.1:8000/create_group/', {
      name: groupName,
      members: selectedOptions,
      creator: (jwt_decode(authTokens.access).user_id),
      about: groupDescription,
      // photo:formData
    }).then((response) => {
      console.log(response.data)
    }).catch(err => {
      console.log(err)
    })
    console.log(selectedOptions);
  }
  const handleAdd = () => {
    console.log("hiii");
    setSelectedOptions([...selectedOptions, user]);
    handleSubmit();
  }

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <TextField id="outlined-basic" label="Group Name" variant="outlined" value={groupName} onChange={(event) => setGroupName(event.target.value)} style={{width:"100%"}}/>
          </Typography>
              {/* <input type="text" input value={groupName} onChange={(event) => setGroupName(event.target.value)} placeholder="group_name"></input> */}
              {/* <label>groupDescription</label> */}
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <TextField id="outlined-basic" label="Group Description" variant="outlined" value={groupDescription} onChange={(event) => setGroupDescription(event.target.value)} style={{width:"100%"}}/>
            </Typography>
              {/* <input type="text" input value={groupDescription} onChange={(event) => setGroupDescription(event.target.value)} placeholder="group_description"></input> */}
              <br />
              {/* <input type="file" onChange={(e)=>{setPhoto(e.target.files[0])}}/> */}
              
              
       <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
          style={{width:"100%"}}
        >
          {/* {names.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={personName.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))} */}
          {members.map((option) => (
            <MenuItem key={option.id} value={(option).id} style={{width:"100%"}}>
              <Checkbox onChange={handleChange} value={(option).id}/>
              <ListItemText primary={option.username} />
            </MenuItem>
          ))}
        </Select>
{/* 
              {members.map(option => (
                <label key={option.id}>
                  <input
                    type="checkbox"
                    value={(option).id}
                    onChange={handleChange}
                  />
                  {option.username}
                  {console.log(selectedOptions)}
                </label>
              ))} */}
              <Typography sx={{mt:2}}>

              <button className='btn btn-dark' onClick={handleSubmit}>submit</button>
              </Typography>
          
        </Box>
      </Modal>
    </div>

  )
}

export default CreateGroup


// <InputLabel id="demo-multiple-checkbox-label1">Tag</InputLabel>
//               <Select
//           labelId="demo-multiple-checkbox-label1"
//           id="demo-multiple-checkbox-label1"
//           multiple
//           value={personName}
//           onChange={handleChange}
//           input={<OutlinedInput label="Tag" />}
//           label='tag'
//           MenuProps={MenuProps}
//           style={{width:"100%"}}
//         >
//           {members.map((option) => (
//             <MenuItem key={option.id} value={(option).id} style={{width:"100%"}}>
//               <Checkbox onChange={handleChange} value={(option).id}/>
//               <ListItemText primary={option.username} />
//             </MenuItem>
//           ))}
//           </Select>