import React from "react";

function DomainReviewerContainer({ pp, contact}) {
  return (
    // Chat container
    <div
      className={`flex justify-between items-center cursor-pointer w-100 h-[85px] px-3 hover:bg-[#202d33]`}
      // ${
      //   active ? "bg-[#202d33]" : ""
      // }
    >
      {/* Profile picture */}
      {/* <img
        src={pp}
        alt="profile_picture"
        className="rounded-full w-[50px] mr-5"
      /> */}

      {/* Info container */}
      <div className="flex justify-between border-t border-neutral-700 w-100 h-100 py-3">
        {/* Contact name and message */}
        <div className="flex justify-between text-white">
          {/* Contact name */}
          <h1 className="font-medium mb-1">{contact}</h1>
        </div>

        {/* Time and number of messages*/}
        <div className="flex flex-col justify-between items-end h-100 text-xs">
          
        </div>
      </div>
    </div>
  );
}

export default DomainReviewerContainer;
