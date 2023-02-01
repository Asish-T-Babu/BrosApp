import React, { useState, useEffect,useContext } from "react";
import GroupChat from "./GroupChat";
import { chatsData } from "../../data/whatsapp";
import { ImFolderDownload } from "react-icons/im";
import {chat4} from '../../assets/whatsapp'
import axios from 'axios'
import {AuthContext} from '../../AuthContext';
import jwt_decode from 'jwt-decode'
import { PostContext } from '../../context';

function GroupChats({ filter }) {
  const [chats, setChats] = useState(chatsData);
  const [members, setMembers] = useState([]);
  let{authTokens}=useContext(AuthContext)
  let{groupRoomId,setGroupRoomId}=useContext(PostContext)

  useEffect(()=>{
    axios.get(`http://127.0.0.1:8000/my_groups/${(jwt_decode(authTokens.access).user_id)}`).then((response) => {
      setMembers(response.data)
    })
  },[])

  function handleClick(id){
    console.log(id);
    setGroupRoomId(id)
  }

  return (
    // Chats main container
    <div className="flex flex-col overflow-y-scroll cursor-pointer h-100">
      {/* Archived container */}
    {console.log(groupRoomId)}
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
          <button className="text-left" onClick={()=>{handleClick(chat.id)}}>
          <GroupChat
            pp={chat4}
            contact={chat.name}
            msg={chat.about}
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

export default GroupChats;
