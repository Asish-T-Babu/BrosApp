import React from 'react';
import {chat4} from '../../assets/whatsapp'
import immg from "../../static/Annotation_2021-09-21_230501_54Wqg5J.png"

import Typography from '@mui/material/Typography';
const Profile = ({ profile,imgUrl  }) => {
  const a='../../static'
  const [vari,setVari] = React.useState("")
  return (
    <div>
      <div>
        <div className='d-flex justify-content-center'>
          
         {profile.photo?
        <img className="rounded-full w-[150px] h-[150px] mr-5" src={imgUrl}>{console.log(imgUrl)}</img>
        :<img
                  src={chat4}
                  alt="profile_picture"
                  className="rounded-full w-[150px] h-[150px] mr-5"
        ></img>}
        </div>
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