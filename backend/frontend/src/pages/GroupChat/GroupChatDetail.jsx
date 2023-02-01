import Message from "../../components/Message";
import RoundedBtn from "../../components/Common/RoundedBtn";
import { MdSearch, MdSend } from "react-icons/md";
import { HiDotsVertical } from "react-icons/hi";
import { BiHappy } from "react-icons/bi";
import { cs1, cs2 } from "../../assets/whatsapp";
import React, { useEffect, useRef, useState,useContext } from 'react';
import * as ws from 'ws';
import { PostContext } from '../../context';
import {AuthContext} from '../../AuthContext';
import jwt_decode from 'jwt-decode'
import axios from 'axios';

function GroupChatDetail() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const socketRef = useRef(null);
  let{groupRoomId}=React.useContext(PostContext)
  const roomName=groupRoomId
  
  let{authTokens}=useContext(AuthContext)
  useEffect(()=>{
    console.log(groupRoomId);
    setMessages([])
    axios.get(`http://127.0.0.1:8000/view_all_messages_of_group/${roomName}`).then((response) => {
      console.log(response.data)
      setMessages(response.data)
    })
  },[roomName])
  useEffect(() => {
    
    const user =jwt_decode(authTokens.access).user_id
    socketRef.current = new WebSocket(`ws://localhost:8000/ws/groupchat/${roomName}/${user}/`);

    socketRef.current.onmessage = (event) => {
      setMessages([...messages, JSON.parse(event.data)]);
    }

    return () => {
      socketRef.current.close();
    }
  }, [messages,roomName]);

  const sendMessage = () => {
    socketRef.current.send(message);
    setMessage('');
  }

  const inputRef = useRef(null);
  const bottomRef = useRef(null);

  // Functions

  // const handleInputChange = () => {
  //   inputRef.current.value.length === 0 ? setTyping(false) : setTyping(true);
  // };

  // const handleInputSubmit = () => {
  //   if (inputRef.current.value.length > 0) {
  //     addMessage({
  //       msg: inputRef.current.value,
  //       time: getTime(),
  //       sent: true,
  //     });
  //     inputRef.current.value = "";
  //     inputRef.current.focus();
  //     setTyping(false);
  //   }
  // };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  // useEffect(() => {
  //   const listener = (e) => {
  //     if (e.code === "Enter") handleInputSubmit();
  //   };

  //   document.addEventListener("keydown", listener);
  //   return () => document.removeEventListener("keydown", listener);
  // });

  return (
    // ChatDetail main container
    <div className="flex flex-col h-screen">
      {/* Contact nav */}
      <div className="flex justify-between bg-[#202d33] h-[60px] p-3">
        {/* Contact info */}
        <div className="flex items-center">
          {/* Profile picture */}
          <img
            src={cs1}
            alt="profile_picture"
            className="rounded-full w-[45px] h-[45px] mr-5"
          />

          {/* Info */}
          <div className="flex flex-col">
            {/* Contact */}
            <h1 className="text-white font-medium">Coding Spot</h1>

            {/* Status */}
            <p className="text-[#8796a1] text-xs">online</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between items-center w-[85px]">
          <RoundedBtn icon={<MdSearch />} />
          <RoundedBtn icon={<HiDotsVertical />} />
        </div>
      </div>

      {/* Messages section */}
      <div
        className="bg-[#0a131a] bg-[url('assets/images/bg.webp')] bg-contain overflow-y-scroll h-100"
        style={{ padding: "12px 7%" }}
      >
        {messages.map((msg) => {
          if(msg.sender === jwt_decode(authTokens.access).user_id ){
          return(
          <Message
          
            msg={msg.message}
            time={msg.time}
            isLink={msg.isLink}
            img={msg.img}
            sent={true}
          />
        )}else{
          return(
          <Message
            msg={msg.message}
            time={msg.time}
            isLink={msg.isLink}
            img={msg.img}
            sent={false}
          />
        )}})}
        <div ref={bottomRef} />
      </div>

      {/* Bottom section */}
      <div className="flex items-center bg-[#202d33] w-100 h-[70px] p-2">
        {/* Emoji btn */}
        {/* <RoundedBtn icon={<BiHappy />} onClick={handleEmojiClick} /> */}
        <RoundedBtn icon={<BiHappy />}/>
        {/* Upload btn */}
        <span className="mr-2">
          {/* <RoundedBtn icon={<AiOutlinePaperClip />} onClick={handleImgUpload} /> */}
        </span>

        {/* Input bar */}
        <input
          type="textarea"
          placeholder="Type a message"
          className="bg-[#2c3943] rounded-lg outline-none text-sm text-neutral-200 w-100 h-100 px-3 placeholder:text-sm placeholder:text-[#8796a1]"
          // onChange={handleInputChange}
          value={message} onChange={(event) => setMessage(event.target.value)}
        />

        {/* Mic/Send btn */}
        <span className="ml-2">
            <RoundedBtn icon={<MdSend />} onClick={sendMessage} />
            {/* <RoundedBtn icon={<MdSend />} onClick={handleInputSubmit} /> */}
        </span>
      </div>
    </div>
  );
}

export default GroupChatDetail;
