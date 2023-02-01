import React, { useState, useEffect,useContext } from "react";
import BasicTable from "../../components/BasicTable";
import TemporaryDrawer from "../../components/TemporaryDrawer";
import LeftMenuCustom from "./LeftMenuCustom";
import { PostContext } from '../../context';
import AddManifest from "../../components/AddManifest";
import Edit_manifest from "../../components/Edit_manifest";

function Left() {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  let{manifest_display,addRowManifest,editManifestBoolean}=useContext(PostContext)
  
  return (
    <>
        
        <div className="w-screen h-screen ">
          {/* 2 components cointainer */}
          <div className="flex whatsapp-bp:justify-center items-center bg-[#111a21] h-screen">
          
            {/* LeftMenu */}
            <div className="bg-[#111a21] min-w-[340px] max-w-[500px] w-100 h-100">
            <div className="flex">
          <TemporaryDrawer data={"left"}/>
              <LeftMenuCustom/> 
            </div>
          </div>
          
            {/* ChatDetail */}



            <div className="bg-[#222f35] min-w-[415px] max-w-[1120px] w-100 h-100">
            
            {manifest_display?
            editManifestBoolean?
            <Edit_manifest/>
            :addRowManifest?
            <AddManifest/>
            :<BasicTable/>
          :
          null}
            
            
            </div>
          </div>
          </div>
    </>
  );
}

export default Left;
