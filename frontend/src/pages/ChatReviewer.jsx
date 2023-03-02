import React, { useState, useEffect } from "react";
import LeftMenu from "./Chat/LeftMenu";
import ChatDetail from "./Chat/ChatDetail";
import LoadingScreen from "../components/LoadingScreen";
import ReviewerDrawer from "../components/ReviewerDrawer";
import { PostContext } from '../context';

function ChatReviewer() {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  let{roomId}=React.useContext(PostContext)

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
          <ReviewerDrawer data={"chat"}/>
            <div className="bg-[#111a21] min-w-[340px] max-w-[500px] w-100 h-100">
              <LeftMenu />
            </div>
            </div>
            {/* ChatDetail */}
            <div className="bg-[#222f35] min-w-[415px] max-w-[1120px] w-100 h-100">
            {roomId?
              <ChatDetail/>:null}
            </div>
          </div>
          </div>
    //   )}
    // </>
  );
}

export default ChatReviewer;
