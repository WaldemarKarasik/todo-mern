import React, { useEffect } from "react";

const getStyle = (message) => {
  let baseClass = "alert ";
  if (message.msgError) {
    baseClass += "alert-danger";
  } else {
    baseClass += "alert-success";
  }
  return baseClass + " text-center";
};
const showMessage = (message) => {
  return message.msgBody;
};

const Message = ({ message }) => {
  return (
    <div className={getStyle(message)} role="alert">
      {showMessage(message)}
    </div>
  );
};

export default Message;
