import React from "react";
import ChatLoader from "../ChatLoader/ChatLoader";
import { Link } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate, faDownload, faComments } from "@fortawesome/free-solid-svg-icons";
import './Feedback.css';


const iconStyle = {
    height: "2rem",
    padding: "0 1rem",
    color: "white",
  };
  

const Feedback = ({feedback, feedbackLoading, }) => {
  return (
    <>
      <p className="subtitle fancy">
        <span>End of Interview</span>
      </p>
      <div className="feedbackContainer">
        {feedbackLoading ? (
          <ChatLoader />
        ) : (
        //   <>
            <TypeAnimation
              sequence={[feedback]}
              speed={90}
              cursor="none"
              repeat={1}
            />
        //     {/* <AudioComponent msg={feedback} /> */}
        //   {/* </> */}
        )}
      </div>

      <div className="chatsButtonsContainer">
        <button
          className="outlinedButton"
          onClick={() => {
            downloadTranscript();
          }}
        >
          <FontAwesomeIcon icon={faDownload} style={iconStyle} />
          Download Transcript
        </button>

        <button
          className="outlinedButton"
          onClick={() => {
            window.location.reload();
            clearDatabase();
          }}
        >
          <FontAwesomeIcon icon={faArrowsRotate} style={iconStyle} />
          Restart Interview
        </button>
      </div>
      <div className="chatsButtonsContainer">
        <Link
          to="https://qualtricsxm7gwbjys5f.qualtrics.com/jfe/form/SV_eFBgfGbd5xhvemi"
          target="_blank"
        >
          <button className="midBtn">
            <FontAwesomeIcon icon={faComments} style={iconStyle} />
            Complete Survey
          </button>
        </Link>
      </div>
    </>
  );
};

export default Feedback;
