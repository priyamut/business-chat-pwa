import React from 'react';

const UserCell = ({onSelectUser, selectedSectionId, user}) => {
  return (
    <div className={`chat-user-item ${selectedSectionId === user.id ? 'active' : ''}`} onClick={() => {
      onSelectUser(user);
    }}>
      <div className="chat-user-row row">

        <div className="chat-contact-col col-xl-10 col-9">
          <div className="h4 name"  style={{"font-weight":"500"}}>{user.name}</div>
          {/* <div className="chat-info-des">{user.mood.substring(0, 30) + "..."}</div> */}
        </div>
      </div>
    </div>
  )
};

export default UserCell;