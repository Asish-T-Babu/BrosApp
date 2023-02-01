import React, { useState, useEffect } from "react";
import LeftMenuGroupChat from "./../GroupChat/LeftMenuGroupChat";
import GroupChatDetail from "./../GroupChat/GroupChatDetail";
import TemporaryDrawer from "../../components/TemporaryDrawer";
import { PostContext } from '../../context';

function WhatsAppGroupChat() {
  let{groupRoomId}=React.useContext(PostContext)
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = setTimeout(() => {
      if (progress >= 100) setLoading(false);
      else {
        const increment = Math.floor(Math.random() * (10 + 1)) + 7;
        setProgress(progress + increment);
      }
    }, 300);

    return () => clearTimeout(id);
  }, [progress]);

  return (
    // <>
    //   {loading ? (
    //     <LoadingScreen progress={progress} />
    //   ) : (
        // main app container
        <div className="w-screen h-screen overflow-hidden">
          {/* 2 components cointainer */}
          <div className="flex whatsapp-bp:justify-center items-center bg-[#111a21] h-screen">
            {/* LeftMenu */}
            <div className="flex">
          <TemporaryDrawer data={"chat"}/>
            <div className="bg-[#111a21] min-w-[340px] max-w-[500px] w-100 h-100">
              <LeftMenuGroupChat/>
            </div>
            </div>
            {/* ChatDetail */}
            <div className="bg-[#222f35] min-w-[415px] max-w-[1120px] w-100 h-100">
              {/* roomId?
              <ChatApp />:null */}
              {groupRoomId?
              <GroupChatDetail/>:null}
            </div>
          </div>
          </div>
    //   )}
    // </>
  );
}

export default WhatsAppGroupChat;
