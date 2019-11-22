import React from 'react';
import moment from 'moment';
import {
  FETCH_ERROR
} from "./../../../../constants/ActionTypes";

const SentMessageCell = ({conversation, property}) => {
var date1 = moment(conversation.time);
var dateComponent = date1.local().format('lll');
console.log(conversation);

  return (
    <div className="d-flex flex-nowrap chat-item flex-row-reverse">
      <div className="bubble">
        <div className="message" style={{color : '#fff'}}>{conversation.outGoingSms.message}</div>
          { conversation.hasOwnProperty('type') && conversation.type &&
            <a className="no-connection"  onClick={(event) => {
              handleRetry(event,conversation);
            }}>{`Tap here to retry`}</a>
          }
      </div>
           <div className="bubble-time">
          <div className="time">{dateComponent}</div>
           </div>
          </div>
  )
  function handleRetry(event,conversation){
    //return (dispatch) => {
     if(navigator.onLine){
      const paramData = {
        businessId: localStorage.getItem('businessId'),
        contactMasterId: property.conversation.user.id,
        message: conversation.outGoingSms.message,
        toNumber: property.conversation.user.contactNo
      };
        property.sendSms(paramData,property);
     }else{
        //dispatch({ type: FETCH_ERROR, payload: 'No Connection, you will be able to send messages as soon as you are back online.'});
        console.log('No Connection, you will be able to send messages as soon as you are back online.')
      }
    //}
  };
  
};


export default SentMessageCell;