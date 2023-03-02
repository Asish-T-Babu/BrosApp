import React, { useState, useEffect,useContext } from "react";
import TemporaryDrawer from "../../components/TemporaryDrawer";
import AdvisorDrawer from "../../components/AdvisorDrawer";
import { PostContext } from '../../context';
import BookReviewerTimeSlot from "./BookReviewerTimeSlot";
import ReviewerLeftMenu from "./ReviewerLeftMenu";
import {AuthContext} from '../../AuthContext';
import jwt_decode from "jwt-decode";

function Reviewer() {
  
  let{authTokens,setUser,setAuthTokens}=useContext(AuthContext)
    
  let a=jwt_decode(authTokens.access).is_superuser
  let b=jwt_decode(authTokens.access).is_reviewer
  let c=jwt_decode(authTokens.access).is_advisor
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
          
      {a? <TemporaryDrawer data={"book"}/> : null}
      {c? <AdvisorDrawer data={"book"}/> : null}
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
