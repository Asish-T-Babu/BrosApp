import React, { useEffect, useRef, useState,useContext } from 'react';
import * as ws from 'ws';
import { PostContext } from '../../context';
import {AuthContext} from '../../AuthContext';
import jwt_decode from 'jwt-decode'
import axios from 'axios';

function ChatApp() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const socketRef = useRef(null);
  let{roomId}=React.useContext(PostContext)
  const roomName=roomId.id
  
  let{authTokens}=useContext(AuthContext)
  useEffect(()=>{
    setMessages([])
    axios.get(`http://127.0.0.1:8000/view_all_messages/${roomName}`).then((response) => {
      setMessages(response.data)
    })
  },[roomName])
  useEffect(() => {
    
    const user =jwt_decode(authTokens.access).user_id
    socketRef.current = new WebSocket(`ws://localhost:8000/ws/chat/${roomName}/${user}/`);

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

  return (
    <div>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>
            
          {console.log(message)}{message.message}</li>
        ))}
      </ul>
      <input value={message} onChange={(event) => setMessage(event.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
export default ChatApp