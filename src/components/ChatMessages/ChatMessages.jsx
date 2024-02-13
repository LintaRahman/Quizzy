import React, {useRef, useEffect} from "react";
import { TypeAnimation } from "react-type-animation";
import AudioComponent from "../AudioComponent/AudioComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot, faUser } from "@fortawesome/free-solid-svg-icons";
import ChatLoader from "../ChatLoader/ChatLoader";

import Feedback from "../Feedback/Feedback";


const profImgStyle = {
    width: "1.5rem",
    height: "1.5rem",
    padding: "1rem",
    marginRight: "2rem",
    borderRadius: "50%",
    background: "rgba(255, 255, 255, 0.5)",
    color: "rgba(28, 30, 58, 1)", //"rgba(28, 30, 15, 1)",
  };

const ChatMessages = ({
  messages,
  botLoading,
  TranscriptLoading,
  feedback,
  feedbackLoading,
  EndOfInterview
}) => {
    const msgEnd = useRef(null);
    useEffect(() => {
        if (msgEnd.current) {
          msgEnd.current.scrollIntoView();
        }
      }, [messages]);
  return (
    <div className="chats">
      {messages.map((message, i) => {
        const isLastBotMessage = i === messages.length - 1 && message.isBot;
        return (
          <div key={i} className={message.isBot ? "chat bot" : "chat"}>
            <FontAwesomeIcon
              icon={message.isBot ? faRobot : faUser}
              style={profImgStyle}
            />
            {isLastBotMessage && !message.isBot && botLoading ? (
              <ChatLoader />
            ) : (
              <>
                {message.isBot ? (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <div style={{ padding: "5px" }}>
                      <AudioComponent msg={message.text} />
                    </div>
                    <div>
                      <TypeAnimation
                        sequence={[message.text]}
                        wrapper="p"
                        speed={90}
                        cursor="none"
                        repeat={1}
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <div>
                        {message.audio === "" ? null : (
                          <audio src={message.audio} controls></audio>
                        )}
                      </div>
                      <div>
                        <p className="txt">{message.text}</p>
                      </div>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        );
      })}
      {messages.length > 0 &&
        !messages[messages.length - 1].isBot &&
        botLoading && (
          <div className="chat bot">
            <FontAwesomeIcon icon={faRobot} style={profImgStyle} />
            <ChatLoader />
          </div>
        )}

      {messages.length > 0 &&
        messages[messages.length - 1].isBot &&
        TranscriptLoading && (
          <div className="chat">
            <FontAwesomeIcon icon={faUser} style={profImgStyle} />
            <ChatLoader />
          </div>
        )}

      {EndOfInterview && (
        <Feedback feedback={feedback} feedbackLoading={feedbackLoading} />
      )}
      <div ref={msgEnd} />
    </div>
  );
};

export default ChatMessages;
