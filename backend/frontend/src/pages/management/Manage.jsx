import React, { useState, useEffect,useContext } from "react";
import TemporaryDrawer from "../../components/TemporaryDrawer";
import AdvisorSignup from "../../components/AdvisorSignup";

import ReviewerSignup from "../../components/ReviewerSignup";
import { PostContext } from '../../context';
import Advisor_view from "./Advisor_view";
import Batch_view from "./Batch_view";
import Domain_view from "./Domain_view";
import ManagementLeftMenu from "./ManagementLeftMenu";
import Reviewer_view from "./Reviewer_view";

function Manage() {
  // let{  }=useContext(PostContext)
  
    
  let{advisorManagement,setAdvisorManagent,reviewerManagement,setReviewerManagent,batchManagement,setBatchManagent,domainManagement,setDomainManagent,addAdmin,setAddAdmin}=useContext(PostContext)
  return (
    <>
        <div className="w-screen h-screen overflow-hidden">
          {/* 2 components cointainer */}
          <div className="flex whatsapp-bp:justify-center items-center bg-[#111a21] h-screen">
            {/* LeftMenu */}
        <div className="flex">
          <TemporaryDrawer data={"manage"}/>
            <div className="bg-[#111a21] min-w-[340px] max-w-[500px] w-100 h-100">
              <ManagementLeftMenu/>
            </div>
            
            </div>
            {/* ChatDetail */}
            <div className="bg-[#222f35] min-w-[415px] max-w-[1120px] w-100 h-100">
            
          {advisorManagement?addAdmin?<AdvisorSignup/>:
          <Advisor_view/>:null}
        {reviewerManagement?addAdmin?<ReviewerSignup/>:
        <Reviewer_view/>:null}
        {batchManagement?
        <Batch_view/>:null}
        {domainManagement?
        <Domain_view/>:null}
          </div>
          </div>
          </div>
    </>
  );
}

export default Manage;
