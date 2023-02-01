import React,{useContext,useEffect, useState} from 'react'
import ChatIcon from '@mui/icons-material/Chat';
import DuoIcon from '@mui/icons-material/Duo';
import ArticleIcon from '@mui/icons-material/Article';
import MoreTimeIcon from '@mui/icons-material/MoreTime';
import { useNavigate } from "react-router-dom";
import { PostContext } from '../context';
import { AuthContext } from '../AuthContext';
import SettingsIcon from '@mui/icons-material/Settings';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';

export default function TemporaryDrawer(props) {
  let a;
  let b;
  let c;
  let d;
  let e;
  console.log(props.data)
  const [close,setClose] = React.useState(false)
  if (props.data =="chat"){
    a=true
  }
  else if (props.data =="meet"){
    b=true
  }
  else if (props.data =="left"){
    c=true
  }
  else if (props.data =="book"){
    d=true
  }
  else if (props.data =="manage"){
    e=true
  }
  
  let{manifest,setManifest,setAddManifestDisplay,setManifest_display,setEditManifestBoolean,addAdmin,setAddAdmin}=useContext(PostContext)
  let{advisorManagement,setAdvisorManagent,reviewerManagement,setReviewerManagent,batchManagement,setBatchManagent,domainManagement,setDomainManagent}=useContext(PostContext)
  useEffect(() => {
    setAdvisorManagent(false)
    setReviewerManagent(false)
    setBatchManagent(false)
    setDomainManagent(false)
    setAddAdmin(false)
    setManifest_display(false)
    setManifest([])
    setAddManifestDisplay(false)
    setEditManifestBoolean(false)
    },[close])
    let {setUser,setAuthTokens}=useContext(AuthContext);
    function logoutHandler(){
    setAuthTokens(null)
    setUser(null)
    localStorage.removeItem('authTokens');
    navigate('/');
  }
  const navigate = useNavigate()
  return (
    <div style={{backgroundColor:"gray",height: "100vh",width:"2vw"}}>
        <div className='pt-5'><button onClick={()=>{navigate('/admin_home');setClose(!(close))}}>{a?<ChatIcon sx={{color:"black"}}/>:<ChatIcon sx={{color:"white"}}/>}</button></div>
        <div className='pt-5'><button onClick={()=>{navigate('/meet');setClose(!(close))}}>{b?<DuoIcon sx={{color:"black"}}/>:<DuoIcon sx={{color:"white"}}/>}</button></div>
        <div className='pt-5'><button onClick={()=>{navigate('/left');setClose(!(close))}}>{c?<ArticleIcon sx={{color:"black"}}/>:<ArticleIcon sx={{color:"white"}}/>}</button></div>
        <div className='pt-5'><button onClick={()=>{navigate('/bookslotreviewer');setClose(!(close))}}>{d?<MoreTimeIcon sx={{color:"black"}}/>:<MoreTimeIcon sx={{color:"white"}}/>}</button></div>
        <div className='pt-5'><button onClick={()=>{navigate('/manage');setClose(!(close));}}>{e?<SettingsIcon sx={{color:"black"}}/>:<SettingsIcon sx={{color:"white"}}/>}</button></div>
        <div className='pt-5'><button onClick={()=>{setClose(!(close));logoutHandler()}}><PowerSettingsNewIcon sx={{color:"white"}}/></button></div>
    </div>
    
  );
} 