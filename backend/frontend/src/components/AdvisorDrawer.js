import React,{useContext,useEffect} from 'react'
import ChatIcon from '@mui/icons-material/Chat';
import DuoIcon from '@mui/icons-material/Duo';
import ArticleIcon from '@mui/icons-material/Article';
import PersonIcon from '@mui/icons-material/Person';
import MoreTimeIcon from '@mui/icons-material/MoreTime';
import GroupIcon from '@mui/icons-material/Group';
import { useNavigate } from "react-router-dom";
import AddDomainModal from "./AddDomainModal";
import { PostContext } from '../context';
import AddBatchModal from './AddBatchModal';
import GradingIcon from '@mui/icons-material/Grading';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import SettingsIcon from '@mui/icons-material/Settings';

export default function TemporaryDrawer() {
  const [close,setClose] = React.useState(false)
  let{manifest,setManifest,setAddManifestDisplay,setManifest_display,setEditManifestBoolean}=useContext(PostContext)
  let{advisorManagement,setAdvisorManagent,reviewerManagement,setReviewerManagent,batchManagement,setBatchManagent,domainManagement,setDomainManagent}=useContext(PostContext)
  useEffect(() => {
    setAdvisorManagent(false)
    setReviewerManagent(false)
    setBatchManagent(false)
    setDomainManagent(false)
    setManifest_display(false)
    setManifest([])
    setAddManifestDisplay(false)
    setEditManifestBoolean(false)
    },[close])
  const navigate = useNavigate()
  return (
    <div style={{backgroundColor:"gray",height: "100vh",width:"2vw"}}>
        <div className='pt-5'><button onClick={()=>{navigate('/admin_home');setClose(!(close))}}><ChatIcon sx={{color:"white"}}/></button></div>
        <div className='pt-5'><DuoIcon sx={{color:"white"}}/></div>
        <div className='pt-5'><button onClick={()=>{navigate('/left');}}><ArticleIcon sx={{color:"white"}}/></button></div>
        <div className='pt-5'><button onClick={()=>{navigate('/bookslotreviewer');setClose(!(close))}}><MoreTimeIcon sx={{color:"white"}}/></button></div>
        <div className='pt-5'><AddDomainModal/></div>
        <div className='pt-5'><AddBatchModal/></div>
        <div className='pt-5'><button onClick={()=>{navigate('/reviewer_signup');setClose(!(close))}}><GradingIcon sx={{color:"white"}}/></button></div>
        <div className='pt-5'><button onClick={()=>{navigate('/advisor_signup');setClose(!(close))}}><PersonAddAlt1Icon sx={{color:"white"}}/></button></div>
        <div className='pt-5'><button onClick={()=>{navigate('/manage');setClose(!(close))}}><SettingsIcon sx={{color:"white"}}/></button></div>
    </div>
    
  );
} 