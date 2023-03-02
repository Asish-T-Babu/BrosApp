import React from 'react';
import {chat4} from '../../assets/whatsapp'

import Typography from '@mui/material/Typography';
const Profile = ({ profile }) => {
  return (
    <div>
      <div>
        <div className='d-flex justify-content-center'>
        {profile.photo?
        <img className="rounded-full w-[150px] h-[150px] mr-5" src={profile.photo}>{console.log(profile.photo)}</img>
        :<img
                  src={chat4}
                  alt="profile_picture"
                  className="rounded-full w-[150px] h-[150px] mr-5"
        ></img>}</div>
        <Typography id="transition-modal-title" variant="h6" component="h2">
        {profile.username}
            </Typography>
        <h5>{profile.email}</h5>
      </div>
      <p>{profile.phone}</p>
    </div>
  );
};

export default Profile;
