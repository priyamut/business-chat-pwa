import React from 'react';
import moment from 'moment';

const ReceivedMessageCell = ({conversation, user}) => {
  let date  = new Date(conversation.time); 
var date1 = moment(conversation.time);
var dateComponent = date1.local().format('LT');
  
  return (
    <div className="d-flex flex-nowrap chat-item">

      {/* <img className="rounded-circle avatar size-40 align-self-end" src={user.thumb}
           alt=""/> */}

      <div className="bubble jambo-card">
          <div className="message" >{conversation.incomingSms.message}</div>
        {/* <div className="time text-muted text-right mt-2">{conversation.sentAt}</div> */}
      </div>
      <div className="bubble-time">
          <div className="time">{dateComponent}</div>
           </div>
    </div>
  )
};


export default ReceivedMessageCell;