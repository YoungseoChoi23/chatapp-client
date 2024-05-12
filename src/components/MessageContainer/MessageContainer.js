import React, { useState } from "react";
import "./MessageContainer.css";
import { Container } from "@mui/system";

const MessageContainer = ({ messageList, user }) => {
  return (
    <div>
      {messageList.map((message, index) => {
        return (
          <Container key={message._id} className="message-container">
            {message.user.name === "system" ? (
              <div className="system-message-container">
                <p className="system-message">{message.chat}</p>
              </div>
            ) : message.user.name === user.name ? (
              <div className="my-message-container">
                <div className="my-message">{message.chat}</div>
              </div>
            ) : (
              <div className="your-message-container">
                {user.name == "쿼카" ? (
                  <img
                    src="/profile.jpeg"
                    className="profile-image"
                    style={
                      (index === 0
                        ? { visibility: "visible" }
                        : messageList[index - 1].user.name === user.name) ||
                      messageList[index - 1].user.name === "system"
                        ? { visibility: "visible" }
                        : { visibility: "hidden" }
                    }
                  />
                ) : (
                  <img
                    src="/eating.png"
                    className="profile-image"
                    style={
                      (index === 0
                        ? { visibility: "visible" }
                        : messageList[index - 1].user.name === user.name) ||
                      messageList[index - 1].user.name === "system"
                        ? { visibility: "visible" }
                        : { visibility: "hidden" }
                    }
                  />
                )}
                <div className="your-message">{message.chat}</div>
              </div>
            )}
          </Container>
        );
      })}
    </div>
  );
};

export default MessageContainer;
