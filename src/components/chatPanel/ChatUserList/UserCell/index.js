import React from 'react';
import moment from 'moment';
import TimeAgo from 'react-timeago'

const UserCell = ({chat, selectedSectionId, onSelectUser}) => {
  return (
    <div key={chat.id} className={`chat-user-item ${selectedSectionId === chat.id ? 'active' : ''}`} onClick={() => {
      onSelectUser(chat);
    }}>
      <div className="chat-user-row row">
        

        <div className="chat-info  col-9">
          <span className="name h4" style={{"font-weight":"500"}}>{chat.name || chat.emailId || chat.contactNo}</span>
          {/* <div className="chat-info-des">{chat.lastMessage.substring(0, 25) + "..."}</div> */}
          <div className="last-message-time"> {<TimeAgo date={moment(chat.recentActivityDate).format('MM/DD/YYYY')} />}</div>
        </div>
{chat.unreadMessage !== 0 &&
        <div className="chat-date">
          <div className="bg-primary rounded-circle badge text-white" style={{margin: "-45px"}}>{chat.unreadMessage}</div>
        </div>
}

      </div>
    </div>
  )
};

export default UserCell;