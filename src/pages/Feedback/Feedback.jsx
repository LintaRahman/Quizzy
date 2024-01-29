import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TypeAnimation } from "react-type-animation";
import {faDownload, faPlus, faComments} from "@fortawesome/free-solid-svg-icons";
import { downloadTranscript } from '../../services/chats';
import { Link } from 'react-router-dom';

const Feedback = () => {
const feedback = localStorage.getItem("feedback");
const iconStyle = {
    height: "2rem",
    padding: "0 1rem",
    color: "white",
  };
  return (
    <>
    <Navbar />
    <section className="pageContainer">
        <h1>Feedback</h1>
        <p style={{fontSize: '1.6rem', padding: '2rem'}}>
            <TypeAnimation
                              sequence={feedback}
                              speed={50}
                              cursor="no"
                              repeat={1}
                            /> 
        </p>
        
        <button
              className="midBtn"
              onClick={() => {
                downloadTranscript();
              }}
            >
              <FontAwesomeIcon icon={faDownload} style={iconStyle} />
              Download Transcript
            </button>
            <Link to='/chat'>
            <button
              className="midBtn"
            >
              <FontAwesomeIcon icon={faPlus} style={iconStyle} />
              New Chat
            </button></Link>
    </section>
    </>
  )
}

export default Feedback