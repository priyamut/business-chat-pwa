import React from 'react';
import UserCell from "./UserCell/index";

const ChatUserList = ({chatUsers, selectedSectionId, onSelectUser}) => {
  var listHasUnreadNotification = chatUsers.some(function (operative) {
    return operative.unreadMessage > 0;
  });

  if(listHasUnreadNotification){
      document.getElementById("button__badge").style.display = "block";
  }else{
    document.getElementById("button__badge").style.display = "none";
  }
  return (
    <div className="chat-user">
      {chatUsers.map((chat, index) =>
        <UserCell key={index} chat={chat} selectedSectionId={selectedSectionId} onSelectUser={onSelectUser}/>
      )}
    </div>
  )
};

export default ChatUserList;