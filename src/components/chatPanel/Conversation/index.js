import React, {Component} from 'react';
import ReceivedMessageCell from "./ReceivedMessageCell/index";
import SentMessageCell from "./SentMessageCell/index";
class  Conversation extends Component {
  formBreakDate = (date)=>{
    var currentDate = new Date();
    if(date === currentDate.toDateString()){
      date = 'Today';
    }
    var previousDate = new Date(date);
    if(previousDate.getFullYear() === currentDate.getFullYear() &&
       previousDate.getMonth() === currentDate.getMonth() && 
       previousDate.getDate() === (currentDate.getDate() -1)){
         date = 'Yesterday';
       }
    return(
      <div className="break-date">
        <div className="date-break-tag-before"></div>
        <span className="text-span">{date}</span>
        <div className="date-break-tag-after"></div>
      </div>
    )
  }
  constructor(props) {
    super(props);
    this.state = {};
    this.props = props;
  }
  render() {
    const {conversationData, selectedUser, property} = this.props; 
    return (  
      <div className="chat-main-content">
      {Object.keys(conversationData).map((key, index) => {
        
        return (
        <div>
          
          {this.formBreakDate(key)}
        {conversationData[key].map((convo, index) => convo.messageType === 'OUTGOING_SMS' ?
        (<div> <SentMessageCell key={index} conversation={convo} property={property}/> </div> ):
        (<div> <ReceivedMessageCell key={index} conversation={convo} user={selectedUser}/></div>))

           }
          </div>
        )
      }
      )}
    </div>
    );
  }
}
 
export default Conversation;