import React from 'react';
import {chat4} from '../../assets/whatsapp'

import Typography from '@mui/material/Typography';
const Profile = ({ profile }) => {
  return (
    <div>
      <div>
        <div className='d-flex justify-content-center'><img src={chat4} alt={`${profile.name}'s avatar`} style={{width:"150px",height:"150px"}} /></div>
        <Typography id="transition-modal-title" variant="h6" component="h2">
        {profile.name}
            </Typography>
        <h5>{profile.about}</h5>
      </div>
      {/* <p>{profile.creator}</p> */}
    </div>
  );
};

export default Profile;
