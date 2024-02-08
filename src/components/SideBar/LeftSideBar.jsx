import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TypeAnimation } from "react-type-animation";
import {
  faDownload,
  faPlus,
  faComments,
  faArrowsRotate,
} from "@fortawesome/free-solid-svg-icons";
import { clearDatabase, downloadTranscript, requestFeedback } from "../../services/chats.js";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Link } from "react-router-dom";

const iconStyle = {
  height: "2rem",
  padding: "0 1rem",
  color: "white",
};

const SideBar = styled.div`
  display: flex;
  flex-flow: col nowrap;
  z-index: 1;
  border-right: 1px solid rgb(100, 100, 100);
  height: 100vh;
  width: 300px;

  @media (max-width: 768px) {
    flex-flow: column nowrap;
    background-color: rgba(28, 30, 58, 1);
    position: fixed;
    transform: ${({ open }) => (open ? "translateX(0)" : "translateX(100%)")};
    top: 0;
    left: -300px;
    width: 300px;
    transition: transform 0.3s ease-in-out;
  }

  .midBtn {
    background: #5a4bff;
    // background: #6a1888;
    border: none;
    color: white;
    padding: 1.5rem;
    font-size: 1.5rem;
    width: 25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    margin-bottom: 0.5rem;
    border-radius: 0.5rem;
  }

  p {
    font-size: 1.6rem;
  }

  .bold {
    font-weight: 1000;
  }

  .upperSide {
    overflow: hidden;
    overflow-y: scroll;
    scroll-behavior: smooth;
    padding: 2.5rem 2.5rem;
    // border-bottom: 1px solid rgb(100, 100, 100);
  }

  .upperSideTop {
    display: flex;
    align-items: center;
    margin: 0.5rem;
  }

  .addBtn {
    height: 2rem;
    padding-right: 1rem;
  }
`;

const RightNav = ({ open }) => {
  let feedback = "";

  const handleQuery = async () => {
    feedback = await requestFeedback();
    console.log("clicked");
  };
  const parameters = JSON.parse(localStorage.getItem("formData"));
  const name = parameters?.name ?? "User";
  const interviewType = localStorage.getItem("interviewType");
  const interviewLevel =
    interviewType === "0"
      ? "Easy"
      : interviewType === "2"
      ? "Medium"
      : interviewType === "5"
      ? "Hard"
      : "Unknown";

  return (
    <SideBar open={open}>
      {feedback != "" ? (
        <BasicModal title="Feedback" content={feedback} />
      ) : null}
      <div className="sideBar">
        <div className="logo">Quizzy</div>

        <div className="upperSide">
          <button
            className="midBtn"
            onClick={() => {
              window.location.reload();
              clearDatabase();
            }}
          >
            <FontAwesomeIcon icon={faArrowsRotate} style={iconStyle} />
            Restart Interview
          </button>
          <div className="upperSideTop"></div>

          <div className="upperSideButton">
            <p>
              <span className="bold">Name: </span>
              <Link to="/form">
                {name}
                {/* <TypeAnimation
                sequence={name}
                speed={50}
                cursor="no"
                repeat={1}
              /> */}{" "}
                <EditOutlinedIcon style={{ color: "white" }} />
              </Link>
            </p>
            {/* <p>
                      <span className='bold'>Status:</span>{" "}
                      {parameters.student ? <>student</> : <>professional</>}
                    </p> */}

            <p>
              Interview for{" "}
              <Link to="/form">
                {parameters.job} <EditOutlinedIcon style={{ color: "white" }} />
              </Link>
            </p>
            <p>
              Interview level: {" "}
              <Link to="/form3">
              {interviewLevel}{" "}
                <EditOutlinedIcon style={{ color: "white" }} />
              </Link>
            </p>
          </div>

          <button
            className="midBtn"
            onClick={() => {
              downloadTranscript();
            }}
          >
            <FontAwesomeIcon icon={faDownload} style={iconStyle} />
            Download Transcript
          </button>
          {/* <Link to="/feedback">
            <button className="midBtn" onClick={handleQuery}>
              <FontAwesomeIcon icon={faComments} style={iconStyle} />
              Get Feedback
            </button>
          </Link> */}
        </div>
      </div>
    </SideBar>
  );
};

export default RightNav;
