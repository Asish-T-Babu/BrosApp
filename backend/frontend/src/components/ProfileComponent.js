import React,{useState,useContext} from 'react'
import axios from "axios"
import jwt_decode from 'jwt-decode'
import {AuthContext} from '../AuthContext';

function ProfileComponent() {
const[photo,setPhoto]=useState()
let{authTokens}=useContext(AuthContext)
function handleSubmit() {
    const formData =new FormData()
    formData.append("photo",photo)
    axios.put(`http://127.0.0.1:8000/update_profile/${(jwt_decode(authTokens.access).user_id)}`,formData).then((res)=>{
        console.log(res.data)
    }).catch(err=>{
        console.log(err)
    })
    
}
  return (
    <div>
      <input type="file" onChange={(e)=>{setPhoto(e.target.files[0])}}/>
      <button className="btn btn-warning rounded-pill m-5" onClick={handleSubmit}>submit</button>
    </div>
  )
}

export default ProfileComponent