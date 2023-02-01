import React, { useState, useEffect,useContext } from "react";
import DomainReviewerContainer from "./DomainReviewerContainer";
import { chatsData } from "../../data/whatsapp";
import axios from "axios";
import { PostContext } from '../../context';

function DomainReviewer() {
  const [domains, setDomains] = useState(chatsData);
  const [select, setSelect] = useState([]);
  let{setReviewerTimeSlotDisplayUser,setReviewerTimeSlotDisplay}=useContext(PostContext)
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/view_domain')
    .then((response)=>{
      setDomains(response.data)
      console.log(response.data)
    }).catch((error)=>{
      alert(error.message)
    })
},[]);
const handleClick=(dom)=>{
    axios.get(`http://127.0.0.1:8000/view_reviewer/${dom}`,{
    }).then((response)=>{
      console.log(response.data)
      setSelect(response.data)
    }).catch((error)=>{
      alert(error.message)
    })
  }
  return (
    // Chats main container
  
    <div className="flex flex-row cursor-pointer h-100 overflow-y-scroll">
    <div className="flex flex-col overflow-y-scroll w-40">
      
      {/* Chats */}
      {domains.map((chat, i) => {
        return (
            
          <button onClick={()=>{handleClick(chat.domain);setReviewerTimeSlotDisplay(false);setReviewerTimeSlotDisplayUser(null);}}>
            {console.log(chat.domain)}
          <DomainReviewerContainer 
          // pp={chat.pp}
          contact={chat.domain}
          />
          </button>
         
        );
      })}
    </div>

    <div className="flex flex-col overflow-y-scroll w-60">
      
      {/* Chats */}
      {select.map((user, i) => {
        return (
          <button onClick={()=>{setReviewerTimeSlotDisplayUser(user.id);setReviewerTimeSlotDisplay(true);}}>
          <DomainReviewerContainer 
          contact={user.first_name}
        />
        </button>
        );
      })}
    </div>
  </div>
  );
}

export default DomainReviewer;
