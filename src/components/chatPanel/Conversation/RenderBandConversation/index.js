import React from "react";
import moment from "moment";

const RenderBandConversation = ({ message, time }) => {
  var date1 = moment(time);
  var dateComponent = date1.local().format("LT");
  return (
    <div style={{ "display": "flex","flexDirection": "column"}}>
      <div className="chat-band">{message}</div>
      <div className="band-time"><span className="time">{dateComponent}</span></div>
    </div>
  );
};
export default RenderBandConversation;
