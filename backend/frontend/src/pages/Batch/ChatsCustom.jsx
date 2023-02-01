import React, { useState, useEffect,useContext } from "react";
import ChatCustom from "./ChatCustom";
import { chatsData } from "../../data/whatsapp";
import axios from "axios";
import { PostContext } from '../../context';

function ChatsCustom() {
  const [chats, setChats] = useState(chatsData);
  const [select, setSelect] = useState([]);
  let{setManifest,setManifest_display,setAddManifestDisplay,setEditManifestBoolean}=useContext(PostContext)
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/view_batch')
    .then((response)=>{
      setChats(response.data)
      console.log(response.data)
    }).catch((error)=>{
      alert(error.message)
    })
},[]);
const handleSubmit=(id)=>{
  axios.get(`http://127.0.0.1:8000/view_manifest/${id}`,{
  }).then((response)=>{
    console.log(response.data)
    setManifest(response.data)
    setManifest_display(true)
    setAddManifestDisplay(false)
  }).catch((error)=>{
    alert(error.message)
  })
}
  return (
    // Chats main container
  
    <div className="flex flex-row cursor-pointer h-100 overflow-y-scroll">
    <div className="flex flex-col overflow-y-scroll w-40">
      
      {/* Chats */}
      {chats.map((chat, i) => {
        return (
          <button onClick={()=>{setSelect(chat.user);setManifest_display(false)}}>
          <ChatCustom 
          // pp={chat.pp}
          contact={chat.batch}
          active={i === 0}
          />
          </button>
         
        );
      })}
    </div>

    <div className="flex flex-col overflow-y-scroll w-60">
      
      {/* Chats */}
      {select.map((user, i) => {
        return (
          <button onClick={()=>{setManifest(user.id);setManifest_display(true);setAddManifestDisplay(false);setEditManifestBoolean(false)}}>
          <ChatCustom 
          // pp={chat.pp}
          contact={user.first_name}
          active={i === 0}
        />
        </button>
        );
      })}
    </div>
  </div>
  );
}

export default ChatsCustom;
