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
  let{groupRoomId,setGroupRoomId,setGroupMessageDetail}=useContext(PostContext)

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
      

      {/* Chats */}
      {members.map((chat, i) => {
        return (
          <button className="text-left" onClick={()=>{handleClick(chat.id);setGroupMessageDetail(chat)}}>
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
