import React, { useState, useEffect,useContext } from "react";
import Chat from "./Chat";
import { chatsData } from "../../data/whatsapp";
import { ImFolderDownload } from "react-icons/im";
import {chat4} from '../../assets/whatsapp'
import axios from 'axios'
import {AuthContext} from '../../AuthContext';
import jwt_decode from 'jwt-decode'
import { PostContext } from '../../context';

function Chats({ filter }) {
  const [chats, setChats] = useState(chatsData);
  const [members, setMembers] = useState([]);
  let{authTokens}=useContext(AuthContext)
  let{roomId,setRoomid,messageDetail,setMessageDetail}=useContext(PostContext)

  useEffect(()=>{
    axios.get(`http://127.0.0.1:8000/view_chat/${(jwt_decode(authTokens.access).user_id)}`).then((response) => {
      setMembers(response.data)
    })
  },[])

  function handleClick(id){
    axios.get(`http://127.0.0.1:8000/create_or_find_room/${(jwt_decode(authTokens.access).user_id)}/${id}`).then((response) => {
      console.log(response.data);
      setRoomid(response.data)
  })
  }

  return (
    // Chats main container
    <div className="flex flex-col overflow-y-scroll cursor-pointer h-100">
      {/* Archived container */}
    {console.log(roomId)}
    {console.log(messageDetail)}
      <div className="flex justify-between items-center w-100 min-h-[55px] px-3 hover:bg-[#202d33]">
        {/* Icon and text container */}
        <div className="flex justify-around items-center w-[150px]">
          {/* Icon */}
          <span className="text-emerald-500 text-lg">
            <ImFolderDownload />
          </span>

          {/* Archived */}
          <h1 className="text-white">Archived</h1>
        </div>

        {/* Number of archived chats */}
        <p className="text-emerald-500 text-xs font-light">7</p>
      </div>

      {/* Chats */}
      {members.map((chat, i) => {
        return (
          <button className="text-left" onClick={()=>{handleClick(chat.id);setMessageDetail(chat)}}>
          <Chat
            pp={chat4}
            contact={chat.username}
            msg={chat.email}
            time={chat.time}
            unreadMsgs={chat.unreadMsgs}
            active={i === 0}
          />
          </button>
        );
      })}
    </div>
  );
}

export default Chats;
