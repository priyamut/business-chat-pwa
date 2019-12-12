import React, { Component } from "react";
import ReceivedMessageCell from "./ReceivedMessageCell/index";
import SentMessageCell from "./SentMessageCell/index";
import RenderBandConversation from "./RenderBandConversation/index";
import moment from "moment";
class Conversation extends Component {
  formBreakDate = date => {
    return (
      <div className="break-date">
        <div className="date-break-tag-before"></div>
        <span className="text-span">{date}</span>
        <div className="date-break-tag-after"></div>
      </div>
    );
  };
  constructor(props) {
    super(props);
    this.state = {};
    this.props = props;
  }

  renderConversation = (convo, selectedUser, property, index) => {
    if (
      convo.messageType === "INCOMING_SMS" ||
      convo.messageType === "BUSINESS_SMS"
    ) {
      return (
        <div>
          {" "}
          <ReceivedMessageCell
            key={index}
            conversation={convo}
            user={selectedUser}
          />
        </div>
      );
    }
    if (convo.messageType === "OUTGOING_SMS") {
      return (
        <div>
          {" "}
          <SentMessageCell
            key={index}
            conversation={convo}
            property={property}
          />{" "}
        </div>
      );
    }
    if (convo.messageType === "TALK_TO_HUMAN_REQUEST") {
      return <RenderBandConversation message={"This contact is requesting live support. Type a message to respond."} time={convo.time} />;
    }
    if (convo.messageType === "TALK_TO_HUMAN_JOINED") {
      return <RenderBandConversation message={"user has joined the conversation through the business console"} time={convo.time} />;
    }
    if (convo.messageType === "TALK_TO_HUMAN_EXIT") {
      return <RenderBandConversation message={"user has left the conversation from the business console"} time={convo.time} />;
    }
  };

  render() {
    const { conversationData, selectedUser, property } = this.props;
    return (
      <div className="chat-main-content">
        {Object.keys(conversationData).map((key, index) => {
          return (
            <div>
              {this.formBreakDate(key)}
              {conversationData[key].map((convo, index) =>
                this.renderConversation(convo, index, selectedUser, property)
              )}
            </div>
          );
        })}
      </div>
    );
  }
}

export default Conversation;
