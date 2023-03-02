import { createContext, useState } from "react";

export const PostContext = createContext(null)
function CompanyContext({ children }) {
  const [addRowManifest, setAddManifestDisplay] = useState(false)
  const [rows, setRows] = useState([]);
  const [manifest_display, setManifest_display] = useState(false);
  const [reviewerTimeSlotDisplay, setReviewerTimeSlotDisplay] = useState(false);
  const [reviewerTimeSlotDisplayUser, setReviewerTimeSlotDisplayUser] = useState(false);
  const [time, setTime] = useState(false);
  const [book, setBook] = useState(false);
  const [manifest, setManifest] = useState();
  const [editManifest, setEditManifest] = useState();
  const [editManifestBoolean, setEditManifestBoolean] = useState(false);

  // management
  const [advisorDeleteModalBoolean, setAdvisorDeleteModalBoolean] = useState(false)
  const [reviewerDeleteModalBoolean, setReviewerDeleteModalBoolean] = useState(false)
  const [BatchDeleteModalBoolean, setBatchDeleteModalBoolean] = useState(false)
  const [DomainDeleteModalBoolean, setDomainDeleteModalBoolean] = useState(false)
  const [advisorManagement, setAdvisorManagent] = useState(false)
  const [reviewerManagement, setReviewerManagent] = useState(false)
  const [batchManagement, setBatchManagent] = useState(false)
  const [domainManagement, setDomainManagent] = useState(false)
  const [addAdmin, setAddAdmin] = useState(false)

  //Chat
  const [roomId, setRoomid] = useState('')
  const [messageDetail, setMessageDetail] = useState('')
  //GroupChat
  const [groupRoomId, setGroupRoomId] = useState('')
  const [groupMessageDetail,setGroupMessageDetail]=useState()
  // profileUpdate
  const [update_profile,setUpdate_profile]=useState(true)
  return (
    <div>
      <PostContext.Provider value={{
        rows, setRows, manifest_display, setManifest_display, manifest, setManifest, time, setTime, reviewerTimeSlotDisplay, setReviewerTimeSlotDisplay,
        reviewerTimeSlotDisplayUser, setReviewerTimeSlotDisplayUser, book, setBook, addRowManifest, setAddManifestDisplay, editManifest, setEditManifest, editManifestBoolean, setEditManifestBoolean,
        advisorDeleteModalBoolean, setAdvisorDeleteModalBoolean, reviewerDeleteModalBoolean, setReviewerDeleteModalBoolean, BatchDeleteModalBoolean, setBatchDeleteModalBoolean,
        DomainDeleteModalBoolean, setDomainDeleteModalBoolean, advisorManagement, setAdvisorManagent, reviewerManagement, setReviewerManagent, batchManagement, setBatchManagent,
        domainManagement, setDomainManagent, addAdmin, setAddAdmin, roomId, setRoomid, groupRoomId, setGroupRoomId, messageDetail, setMessageDetail,update_profile,setUpdate_profile,
        groupMessageDetail,setGroupMessageDetail
      }}>
        {children}
      </PostContext.Provider>
    </div>
  )
}

export default CompanyContext