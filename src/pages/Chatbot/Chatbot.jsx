import React, { useState, useRef, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./Chatbot.css";
// import "regenerator-runtime/runtime";
import "../../components/RecorderAnimation/RecorderAnimation.css";
import { TypeAnimation } from "react-type-animation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  clearDatabase,
  downloadTranscript,
  requestFeedback,
  sendMsgToOpenAI,
} from "../../services/chats.js";
import ChatLoader from "../../components/ChatLoader/ChatLoader";
import AudioComponent from "../../components/AudioComponent/AudioComponent";
import {
  faPaperPlane,
  faRobot,
  faUser,
  faDownload,
  faArrowsRotate,
  faComments,
  faMicrophone,
  faMicrophoneSlash,
} from "@fortawesome/free-solid-svg-icons";
import convertSpeechToText from "../../services/SpeechToText.js";
// import RecordMessage from "../../components/RecordMessage/RecordMessage.jsx";
import { ReactMediaRecorder } from "react-media-recorder";
import RecordIcon from "../../components/RecordMessage/RecordIcon.jsx";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const parameters = JSON.parse(localStorage.getItem("formData"));

const iconStyle = {
  height: "2rem",
  padding: "0 1rem",
  color: "white",
};

const profImgStyle = {
  width: "1.5rem",
  height: "1.5rem",
  padding: "1rem",
  marginRight: "2rem",
  borderRadius: "50%",
  background: "rgba(255, 255, 255, 0.5)",
  color: "rgba(28, 30, 58, 1)", //"rgba(28, 30, 15, 1)",
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


const Chatbot = () => {
  const [pageLoading, isPageLoading] = useState(true);
  const [EndOfInterview, isEndOfInterview] = useState(false);
  const msgEnd = useRef(null);
  const [botLoading, isBotLoading] = useState(false);
  const [feedbackLoading, isFeedbackLoading] = useState(false);
  const [TranscriptLoading, setTranscriptLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [feedback, setFeedback] = useState("");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const [end, setEnd] = useState(false);
  const [recordingStatus, setRecordingStatus] = useState(false);
  const [Transcript, setTranscript] = useState("");
  const name = parameters?.name ?? "User";
  const [messages, setMessages] = useState([
    {
      text: `Hi ${name}, I'm Quizzy. How are you doing today?`,
      isBot: true,
      audio: "",
    },
  ]);

  useEffect(() => {
    if (msgEnd.current) {
      msgEnd.current.scrollIntoView();
    }
  }, [messages]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const hasReloaded = localStorage.getItem("hasReloaded");
        if (!hasReloaded) {
          // Reload the page
          localStorage.setItem("hasReloaded", true);
          window.location.reload();
        } else {
          // If the page has already reloaded, stop the botLoading state
          isPageLoading(false);
        }
      } catch (error) {
        console.error("Error botLoading data from localStorage:", error);
        // isPageLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSend = async () => {
    isBotLoading(true);
    const text = prompt;
    setPrompt("");
    setMessages([...messages, { text, isBot: false, audio: "" }]);

    const res = await sendMsgToOpenAI(text);
    isBotLoading(false);
    setMessages([
      ...messages,
      { text: prompt, isBot: false, audio: "" },
      { text: res, isBot: true, audio: "" },
    ]);
    checkEndOfInterview();
  };

  const handleEnter = async (e) => {
    if (e.key === "Enter") await handleSend();
  };

  const handleStop = async (audioUrl) => {
    console.log(audioUrl);
    setTranscriptLoading(true);

    try {
      const transcript = await convertSpeechToText(audioUrl);
      console.log("Transcription:", transcript);
      // != "" ? transcript : prompt;
      // const transcriptText = transcript.data.text ? transcript.data.text : '';

      if (transcript && transcript.data && transcript.data.text) {
        const text = transcript.data.text;
        setMessages([...messages, { text, isBot: false, audio: audioUrl }]);
        // console.log({ text, isBot: false, audio: audioUrl });
        setTranscriptLoading(false);
        const res = await sendMsgToOpenAI(text);
        setMessages([
          ...messages,
          { text: text, isBot: false, audio: audioUrl },
          { text: res, isBot: true, audio: "" },
        ]);

        // console.log(messages);
        checkEndOfInterview();
      } else {
        // Handle case where transcript is not available
        console.error("Transcript is not available.");
      }
    } catch (error) {
      console.error("Error converting speech to text:", error);
    } finally {
      setTranscriptLoading(false);
    }
  };

  const checkEndOfInterview = async () => {
    if (localStorage.getItem("EndOfInterview") == "true") {
      document.getElementById("UserInput").disabled = true;
      isEndOfInterview(true);
      isFeedbackLoading(true);
      const interviewFeedback = await requestFeedback();
      console.log(interviewFeedback);
      isFeedbackLoading(false);
      setFeedback(interviewFeedback);
    }
  };

  const [permission, setPermission] = useState(false); //REMEMBER TO SET TO FALSE
  const mediaRecorder = useRef(null);

  const [stream, setStream] = useState(null);
  const [audio, setAudio] = useState([]);
  const [audioChunks, setAudioChunks] = useState([]);

  const getMicrophonePermission = async () => {
    if ("MediaRecorder" in window) {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        setPermission(true);
        setStream(mediaStream);
      } catch (err) {
        alert(err.message);
      }
    } else {
      alert("The MediaRecorder API is not supported in your browser.");
    }
  };

  const startRecording = async () => {
    try {
      if (!stream || !(stream instanceof MediaStream)) {
        // If stream is not set, request microphone permission
        await getMicrophonePermission();
      }
      if (stream instanceof MediaStream) {
        console.log("Started Recording");
        setRecordingStatus(true);
        const media = new MediaRecorder(stream, { type: "audio/webm" });
  
        mediaRecorder.current = media;
  
        mediaRecorder.current.start();
  
        let localAudioChunks = [];
  
        mediaRecorder.current.ondataavailable = (event) => {
          if (typeof event.data === "undefined") return;
          if (event.data.size === 0) return;
          localAudioChunks.push(event.data);
        };
  
        setAudioChunks(localAudioChunks);
      } else {
        console.error("MediaStream is not available.");
      }
    } catch (error) {
      console.error("Error starting recording:", error);
    }
  };

  const stopRecording = () => {
    console.log("Stopped Recording");

    setRecordingStatus(false);
    if (mediaRecorder.current) {
      mediaRecorder.current.stop();

      mediaRecorder.current.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/webm" });
        const audioUrl = URL.createObjectURL(audioBlob);
        console.log("Inside");
        setAudio([...audio, audioUrl]);

        setAudioChunks([]);
        setTranscriptLoading(true);
        try {
          const transcript = await convertSpeechToText(audioUrl);
          setTranscript(transcript.data.text);
          console.log("Transcription:", transcript.data.text);

          const text = transcript.data.text; // != "" ? transcript : prompt;

          setTranscript("");
          setMessages([...messages, { text, isBot: false, audio: audioUrl }]);
          setTranscriptLoading(false);

          const res = await sendMsgToOpenAI(text);
          setMessages([
            ...messages,
            { text: text, isBot: false, audio: audioUrl },
            { text: res, isBot: true, audio: "" },
          ]);

          console.log(messages);
          checkEndOfInterview();
          // Perform any further actions with the transcriptMsg
        } catch (error) {
          setTranscriptLoading(false);
          console.error("Error converting speech to text:", error);
        }
      };
    }
  };

  // State for chat messages and user input

  return (
    <>
      {pageLoading ? (
        <section className="pageContainer">
          <ChatLoader />
        </section>
      ) : (
        <>
          <Navbar page="chatbot" />

          <div className="Chatbot">
            <div className="main">
              <div className="chats">
                {messages.map((message, i) => {
                  const isLastBotMessage =
                    i === messages.length - 1 && message.isBot;
                  return (
                    <div
                      key={i}
                      className={message.isBot ? "chat bot" : "chat"}
                    >
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
                                {/* <AudioComponent msg={message.text} />  */}
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
                  <>
                    <p className="subtitle fancy">
                      <span>End of Interview</span>
                    </p>
                    <p className="feedbackContainer">
                      {feedbackLoading ? (
                        <ChatLoader />
                      ) : (
                        <>
                          <TypeAnimation
                            sequence={[feedback]}
                            wrapper="p"
                            speed={90}
                            cursor="none"
                            repeat={1}
                          />
                          {/* <AudioComponent msg={feedback} /> */}
                        </>
                      )}
                    </p>

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
                        <FontAwesomeIcon
                          icon={faArrowsRotate}
                          style={iconStyle}
                        />
                        Restart Interview
                      </button>
                    </div>
                    <div className="chatsButtonsContainer">
                      <Link
                        to="https://qualtricsxm7gwbjys5f.qualtrics.com/jfe/form/SV_eFBgfGbd5xhvemi"
                        target="_blank"
                      >
                        <button className="midBtn">
                          <FontAwesomeIcon
                            icon={faComments}
                            style={iconStyle}
                          />
                          Complete Survey
                        </button>
                      </Link>
                    </div>
                  </>
                )}
                <div ref={msgEnd} />
              </div>
              {EndOfInterview ? (
                ""
              ) : (
                <div className="chatFooter">
                  <div className="inp">
                    {/* <ReactMediaRecorder
                  audio
                  onStop={handleStop}
                  render={({ status, startRecording, stopRecording }) => (
                    // <div className="mt-2">
                    <div className="recording-animation-container">
                      <button
                        onMouseDown={startRecording}
                        onMouseUp={stopRecording}
                        
                        // className="bg-white p-4 rounded-full"
                        className="send"
                      >
                        <RecordIcon stat = {status}/>
                      </button>
                      {status === "recording" ? (
                        <div className="recording-dot" />
                      ) : null}
                     <p className="mt-2 text-white font-light">{status}</p> 
                    </div>
                  )}
                /> */}
                    {/* <RecordMessage handlestop={handleStop} /> */}


                    {!recordingStatus ? (
                      
                      <button onClick={startRecording} className="send">
                        <FontAwesomeIcon
                          icon={faMicrophoneSlash}
                          style={iconStyle}
                        />
                      </button>
                    ) : null}
                    {recordingStatus ? (
                      <div className="recording-animation-container">
                        <button onClick={stopRecording} className="send">
                          <FontAwesomeIcon
                            icon={faMicrophone}
                            style={iconStyle}
                          />
                        </button>
                        <div className="recording-dot" />
                      </div>
                    ) : null}

                    <input
                      id="UserInput"
                      type="text"
                      placeholder="Send a message"
                      value={prompt}
                      onKeyDown={handleEnter}
                      onChange={(e) => {
                        setPrompt(e.target.value);
                      }}
                    />
                    <button className="send" onClick={handleSend}>
                      <FontAwesomeIcon icon={faPaperPlane} style={iconStyle} />
                    </button>
                  </div>
                  <p>Powered by ChatGPT 3.5. </p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Chatbot;
