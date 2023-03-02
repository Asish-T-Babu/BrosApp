import React from 'react'
import ChatCustom from "./ChatCustom";

function LeftChatsCustom({chats}) {
  return (
    <div className="flex flex-col overflow-y-scroll w-60 ">
    {/* Archived container */}
    

    {/* Chats */}
    {chats.map((chat, i) => {
      return (
        <ChatCustom 
        // pp={chat.pp}
        contact={chat.batch}
        active={i === 0}
        />
        );
      })}
  </div>
  )
}

export default LeftChatsCustom
