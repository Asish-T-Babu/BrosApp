import React,{useContext} from 'react'
import { useParams } from 'react-router-dom'
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt"
import {AuthContext} from '../../AuthContext';
import jwt_decode from "jwt-decode";
import TemporaryDrawer from "../../components/TemporaryDrawer";
function RoomPage() {
    const { roomId } = useParams();
    let{authTokens,setUser,setAuthTokens}=useContext(AuthContext)
    const myMeeting = async (element)=>{
        const appID = 538912741;
        const serverSecret = "5aa54ec0845e30fe85ae815f17ed6f11";
        const kitToken =ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomId,  Date.now().toString( ),  jwt_decode(authTokens.access).name);
        const zp =ZegoUIKitPrebuilt.create(kitToken);
        zp.joinRoom({
            container: element,
            scenario:{
                mode: ZegoUIKitPrebuilt.VideoConference,
            },
        });
    }
  return (
    // <div className="flex">
    //       <TemporaryDrawer/>
    <div className='room-page'>
      <div ref={myMeeting}/>
    </div>
    // </div>
  )
}

export default RoomPage
