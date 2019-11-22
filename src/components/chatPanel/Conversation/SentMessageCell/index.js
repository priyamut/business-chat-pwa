import React from 'react';
import moment from 'moment';
import {
  FETCH_ERROR
} from "./../../../../constants/ActionTypes";

const SentMessageCell = ({ conversation, property }) => {
  var date1 = moment(conversation.time);
  var dateComponent = date1.local().format('lll');


  return (
    <React.Fragment>
      <div className="d-flex flex-nowrap chat-item flex-row-reverse">
      
        <div className="bubble">
        {conversation.hasOwnProperty('type') && conversation.type &&
       <i className="zmdi zmdi-info zmdi-hc-lg retry-connection" />}
          <div className="message" style={{ color: '#fff' }}>{conversation.outGoingSms.message}</div>
          
        </div>
        
        <div className="bubble-time">
          <div className="time">{dateComponent}</div>
        </div>
        {conversation.hasOwnProperty('type') && conversation.type &&
            <a className="no-connection" onClick={(event) => {
              handleRetry(event, conversation);
            }}>{`Tap here to retry`}</a>
          }
      </div>
      </React.Fragment>
  )



  function handleRetry(event, conversation) {
    if (navigator.onLine) {
      const paramData = {
        businessId: localStorage.getItem('businessId'),
        contactMasterId: property.conversation.user.id,
        message: conversation.outGoingSms.message,
        toNumber: property.conversation.user.contactNo,
        conversationId: conversation.uniqueId
      };
      property.sendSms(paramData, property);
    } else {
      alert('No Connection, you will be able to send messages as soon as you are back online.')
    }
  };

};


export default SentMessageCell;