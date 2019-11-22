import React from 'react';
import ReceivedMessageCell from "./ReceivedMessageCell/index";
import SentMessageCell from "./SentMessageCell/index";

const Conversation = ({conversationData, selectedUser,property}) => {
  return (
    <div className="chat-main-content">
      {conversationData.map((conversation, index) => conversation.messageType === 'OUTGOING_SMS' ?
        <SentMessageCell key={index} conversation={conversation} property={property}/> :
        <ReceivedMessageCell key={index} conversation={conversation} user={selectedUser}/>
      )}
    </div>
  )
};

export default Conversation;