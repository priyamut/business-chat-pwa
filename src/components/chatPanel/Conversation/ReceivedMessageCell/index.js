import React from 'react';

const ReceivedMessageCell = ({conversation, user}) => {
  let date  = new Date(conversation.time); 
  const bubbleTime = formatDate(date) + ', '+
  date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

  function formatDate(date){
    var dd = date.getDate();
    var mm = date.getMonth() + 1; //January is 0!
  
    var yyyy = date.getFullYear();
    if (dd < 10) {
     dd = '0' + dd;
    } 
    if (mm < 10) {
      mm = '0' + mm;
    } 
    return  dd + '/' + mm + '/' + yyyy;
  }
  
  return (
    <div className="d-flex flex-nowrap chat-item">

      {/* <img className="rounded-circle avatar size-40 align-self-end" src={user.thumb}
           alt=""/> */}

      <div className="bubble jambo-card">
          <div className="message" >{conversation.incomingSms.message}</div>
        {/* <div className="time text-muted text-right mt-2">{conversation.sentAt}</div> */}
      </div>
      <div className="bubble-time">
          <div className="time">{bubbleTime}</div>
           </div>
    </div>
  )
};


export default ReceivedMessageCell;