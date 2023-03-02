import Profile from './GroupChatProfile';
import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import {chat4} from '../../assets/whatsapp'
import { PostContext } from '../../context';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};
export default function TransitionsModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  let{roomId,groupMessageDetail,setMessageDetail}=React.useContext(PostContext)

  return (
    <div>
      <Button onClick={handleOpen}>
          {/* Profile picture */}
          <img
            src={chat4}
            alt="profile_picture"
            className="rounded-full w-[45px] h-[45px] mr-5"
          />

          {/* Info */}
          </Button>
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
            <div>
              <Profile profile={groupMessageDetail} />
              {/* <button className='btn btn-dark'>Edit</button> */}
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}










// import React, { useState } from 'react';

// const CheckboxGroup = () => {
//   // Use the useState hook to initialize the selected options array
//   const [selectedOptions, setSelectedOptions] = useState([]);

//   // The options that will be rendered as checkboxes
//   const options = [
//     { label: 'Option 1', value: 1 },
//     { label: 'Option 2', value: 2 },
//     { label: 'Option 3', value: 3 },
//     { label: 'Option 4', value: 4 }
//   ];

//   const handleChange = (event) => {
//     // Get the value of the checkbox that was just changed
//     const selectedValue = event.target.value;
//     console.log(event.target.value);
//     // If the checkbox was checked, add the value to the selected options array
//     if (event.target.checked) {
//       setSelectedOptions([...selectedOptions, selectedValue]);
//     } else {
//       // If the checkbox was unchecked, remove the value from the selected options array
//       setSelectedOptions(selectedOptions.filter(option => option !== selectedValue));
      
//     }
//   }

//   return (
//     <div>
//       {options.map(option => (
//         <label key={option.value}>
//           <input
//             type="checkbox"
//             value={option.value}
//             onChange={handleChange}
//           />
//           {option.label}
//           {console.log(selectedOptions)}
//         </label>
//       ))}
//     </div>
//   );
// }

// export default CheckboxGroup;