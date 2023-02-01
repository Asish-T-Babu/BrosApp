import React,{useState,useContext,useEffect} from 'react'
import axios from "axios"
import jwt_decode from 'jwt-decode'
import {AuthContext} from '../AuthContext';

function View_profile() {
    const [user,setUser] = useState()

    const [vari,setVari] = useState("")
    let{authTokens}=useContext(AuthContext)
    useEffect(() => {
    
        axios.get(`http://127.0.0.1:8000/view_profile/${(jwt_decode(authTokens.access).user_id)}`,).then((res)=>{
        console.log(res.data)
        setUser(res.data)
        setVari(res.data.photo.replace("frontend/src/static/",""))
       
    }).catch(err=>{
        console.log(err)
    })
    },[vari])
  return (
    
    <div>
        <div>{vari}</div>
     {vari !="" && <img src={require("../static"+vari)} alt="image"/>} 
    </div>
  )
}

export default View_profile
