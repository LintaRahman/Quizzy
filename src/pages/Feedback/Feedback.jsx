import React, {useEffect, useState} from "react";
import Navbar from "../../components/Navbar/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TypeAnimation } from "react-type-animation";
import {
  faDownload,
  faPlus,
  faComments,
} from "@fortawesome/free-solid-svg-icons";
import { downloadTranscript } from "../../services/chats";
import ChatLoader from "../../components/ChatLoader/ChatLoader";
import { Link } from "react-router-dom";
import "./Feedback.css";

const Feedback = () => {
  const [pageLoading, isPageLoading] = useState(true);
  const feedback = localStorage.getItem("feedback");
  const iconStyle = {
    height: "2rem",
    padding: "0 1rem",
    color: "white",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const hasReloaded = localStorage.getItem("hasLoaded");
        if (!hasReloaded) {
          // Reload the page
          localStorage.setItem("hasLoaded", true);
          window.location.reload();
        } else {
          // If the page has already reloaded, stop the loading state
          isPageLoading(false);
        }
      } catch (error) {
        console.error("Error loading data from localStorage:", error);
        // isPageLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      {pageLoading ? (
        <section className="pageContainer">
          <ChatLoader />
        </section>
      ) : (
        <>
          <Navbar />
          <section className="feedbackContainer">
            <h1>Feedback</h1>
            <p style={{ fontSize: "1.6rem", padding: "2rem" }}>
              <TypeAnimation
                sequence={feedback}
                speed={50}
                cursor="no"
                repeat={1}
              />
            </p>
            <div className="feedbackButtonsContainer">
              <Link to="/chat">
                <button className="midBtn">
                  <FontAwesomeIcon icon={faPlus} style={iconStyle} />
                  New Chat
                </button>
              </Link>

              <button
                className="midBtn"
                onClick={() => {
                  downloadTranscript();
                }}
              >
                <FontAwesomeIcon icon={faDownload} style={iconStyle} />
                Download Transcript
              </button>
              <Link to="">
                <button className="midBtn">
                  <FontAwesomeIcon icon={faComments} style={iconStyle} />
                  Complete Survey
                </button>
              </Link>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default Feedback;
