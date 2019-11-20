import React from 'react';
import moment from 'moment';
const SentMessageCell = ({conversation}) => {
  let date  = new Date(conversation.time); 
  const bubbleTime = date.toDateString() + ', '+
  date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  
  // console.log({conversation})
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

var date1 = moment(conversation.time);
var dateComponent = date1.utc().format('llll');
console.log(dateComponent);

  return (
    <div className="d-flex flex-nowrap chat-item flex-row-reverse">
      <div className="bubble">
        <div className="message" style={{color : '#fff'}}>{conversation.outGoingSms.message}</div>
          {/* <div className="no-connection">{`Tap here to retry`}</div> */}
      </div>
           <div className="bubble-time">
          <div className="time">{dateComponent}</div>
           </div>
    </div>
  )
};


export default SentMessageCell;