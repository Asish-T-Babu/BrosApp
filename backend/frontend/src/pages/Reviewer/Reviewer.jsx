import React, { useState, useEffect,useContext } from "react";
import TemporaryDrawer from "../../components/TemporaryDrawer";
import { PostContext } from '../../context';
import BookReviewerTimeSlot from "./BookReviewerTimeSlot";
import ReviewerLeftMenu from "./ReviewerLeftMenu";

function Reviewer() {
  let{reviewerTimeSlotDisplay,setReviewerTimeSlotDisplay}=useContext(PostContext)
  useEffect(() => {
    setReviewerTimeSlotDisplay(false)
    },[])
  return (
    <>
        <div className="w-screen h-screen overflow-hidden">
          {/* 2 components cointainer */}
          <div className="flex whatsapp-bp:justify-center items-center bg-[#111a21] h-screen">
            {/* LeftMenu */}
        <div className="flex">
          <TemporaryDrawer data={"book"}/>
            <div className="bg-[#111a21] min-w-[340px] max-w-[500px] w-100 h-100">
              <ReviewerLeftMenu/>
            </div>
            
            </div>
            {/* ChatDetail */}
            <div className="bg-[#222f35] min-w-[415px] max-w-[1120px] w-100 h-100">
            {reviewerTimeSlotDisplay?
          <BookReviewerTimeSlot/>
          :
          null}
          </div>
          </div>
          </div>
    </>
  );
}

export default Reviewer;
