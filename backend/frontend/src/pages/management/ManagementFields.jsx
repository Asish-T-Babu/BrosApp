import React, { useState, useEffect,useContext } from "react";
import { chatsData } from "../../data/whatsapp";
import axios from "axios";
import { PostContext } from '../../context';

function ManagementFields() {
  const [domains, setDomains] = useState(chatsData);
  const [select, setSelect] = useState([]);
  let{advisorManagement,setAdvisorManagent,reviewerManagement,setReviewerManagent,batchManagement,setBatchManagent,domainManagement,setDomainManagent,setAddAdmin}=useContext(PostContext)
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/view_domain')
    .then((response)=>{
      setDomains(response.data)
      console.log(response.data)
    }).catch((error)=>{
      alert(error.message)
    })
},[]);
const handleClick=(dom)=>{
    axios.get(`http://127.0.0.1:8000/view_reviewer/${dom}`,{
    }).then((response)=>{
      console.log(response.data)
      setSelect(response.data)
    }).catch((error)=>{
      alert(error.message)
    })
  }
  return (
    // Chats main container
  
    <div className="flex flex-row cursor-pointer h-100 overflow-y-scroll">
    <div className="flex flex-col overflow-y-scroll w-100">
          <button onClick={()=>{setAdvisorManagent(true);setReviewerManagent(false);setBatchManagent(false);setDomainManagent(false);setAddAdmin(false)}}>
            <div
              className={`flex justify-between items-center cursor-pointer w-100 h-[85px] px-3 hover:bg-[#202d33]`}
            >
              {/* Info container */}
              <div className="flex justify-between border-t border-neutral-700 w-100 h-100 py-3">
                {/* Contact name and message */}
                <div className="flex justify-between text-white">
                  {/* Contact name */}
                  <h1 className="font-medium mb-1">Advisor Management</h1>
                </div>
              </div>
            </div>
          </button>
          <button onClick={()=>{setAdvisorManagent(false);setReviewerManagent(true);setBatchManagent(false);setDomainManagent(false);setAddAdmin(false)}}>
            <div
              className={`flex justify-between items-center cursor-pointer w-100 h-[85px] px-3 hover:bg-[#202d33]`}
            >
              {/* Info container */}
              <div className="flex justify-between border-t border-neutral-700 w-100 h-100 py-3">
                {/* Contact name and message */}
                <div className="flex justify-between text-white">
                  {/* Contact name */}
                  <h1 className="font-medium mb-1">Reviewer Management</h1>
                </div>
              </div>
            </div>
          </button>
          <button onClick={()=>{setAdvisorManagent(false);setReviewerManagent(false);setBatchManagent(true);setDomainManagent(false);setAddAdmin(false)}}>
            <div
              className={`flex justify-between items-center cursor-pointer w-100 h-[85px] px-3 hover:bg-[#202d33]`}
            >
              {/* Info container */}
              <div className="flex justify-between border-t border-neutral-700 w-100 h-100 py-3">
                {/* Contact name and message */}
                <div className="flex justify-between text-white">
                  {/* Contact name */}
                  <h1 className="font-medium mb-1">Batch Management</h1>
                </div>
              </div>
            </div>
          </button>
          <button onClick={()=>{setAdvisorManagent(false);setReviewerManagent(false);setBatchManagent(false);setDomainManagent(true);setAddAdmin(false)}}>
            <div
              className={`flex justify-between items-center cursor-pointer w-100 h-[85px] px-3 hover:bg-[#202d33]`}
            >
              {/* Info container */}
              <div className="flex justify-between border-t border-neutral-700 w-100 h-100 py-3">
                {/* Contact name and message */}
                <div className="flex justify-between text-white">
                  {/* Contact name */}
                  <h1 className="font-medium mb-1">Domain Management</h1>
                </div>
              </div>
            </div>
          </button>
    </div>
  </div>
  );
}

export default ManagementFields;
