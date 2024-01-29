import React, { useState, useRef, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./Chatbot.css";
import "regenerator-runtime/runtime";
import "../../components/RecorderAnimation/RecorderAnimation.css";
import { TypeAnimation } from "react-type-animation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { sendMsgToOpenAI } from "../../services/chats.js";
import ChatLoader from "../../components/ChatLoader/ChatLoader";
import AudioComponent from "../../components/AudioComponent/AudioComponent";
import {
  faPlus, faMessage, faHome, faPaperPlane, faRobot, faUser, faMicrophone, faCircleQuestion, faCircleInfo, faMicrophoneSlash,
} from "@fortawesome/free-solid-svg-icons";
import robotIcon from '../../assets/robot-icon.png';
import convertSpeechToText from "../../services/SpeechToText.js";
import Sidebar from "../../components/SideBar/Sidebar";

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
  color: 'rgba(28, 30, 58, 1)',//"rgba(28, 30, 15, 1)",
};

const Chatbot = () => {  
  const mimeType = "audio/webm";
  const [permission, setPermission] = useState(true); //REMEMBER TO SET TO FALSE
  const mediaRecorder = useRef(null);
  const [recordingStatus, setRecordingStatus] = useState(false);
  const [stream, setStream] = useState(null);
  const [audio, setAudio] = useState([]);
  const [audioChunks, setAudioChunks] = useState([]);
  const [Transcript, setTranscript] = useState("");
  const [TranscriptLoading, setTranscriptLoading] = useState(false);

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
    await getMicrophonePermission();
    console.log("Started Recording");
    setRecordingStatus(true);
    const media = new MediaRecorder(stream, { type: mimeType });

    mediaRecorder.current = media;

    mediaRecorder.current.start();

    let localAudioChunks = [];

    mediaRecorder.current.ondataavailable = (event) => {
      if (typeof event.data === "undefined") return;
      if (event.data.size === 0) return;
      localAudioChunks.push(event.data);
    };

    setAudioChunks(localAudioChunks);
  };

  const stopRecording = () => {
    console.log("Stopped Recording");

    setRecordingStatus(false);
    if (mediaRecorder.current) {
      mediaRecorder.current.stop();

      mediaRecorder.current.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: mimeType });
        const audioUrl = URL.createObjectURL(audioBlob);
        console.log("Inside");
        setAudio([...audio, audioUrl]);

        setAudioChunks([]);
        try {
          const transcript = await convertSpeechToText(audioUrl);
          setTranscript(transcript.data.text);
          console.log('Transcription:', transcript.data.text);
          setTranscriptLoading(true);

          const text = transcript.data.text;// != "" ? transcript : prompt;
          
          setTranscript("");
          setMessages([...messages, { text, isBot: false, audio: audioUrl }]);
          const res = await sendMsgToOpenAI(transcript.data.text);
          setTranscriptLoading(false);
          setMessages([
            ...messages,
            { text: transcript.data.text, isBot: false, audio: audioUrl },
            { text: res, isBot: true, audio: "" },
          ]);
          // Perform any further actions with the transcriptMsg
        } catch (error) {
          console.error("Error converting speech to text:", error);
        }
      };
    }
  };

  // State for chat messages and user input
  const msgEnd = useRef(null);
  const [loading, isLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const name = parameters.name? parameters.name : '';
  const [messages, setMessages] = useState([
    {
      text: `Hi ${name}, I'm Quizzy. How are you doing today?`,
      isBot: true,
      audio: "",
    },
  ]);

  useEffect(() => {
    msgEnd.current.scrollIntoView();
  }, [messages]);

  const handleSend = async () => {
    isLoading(true);
    const text = prompt;
    setPrompt("");
    setMessages([...messages, { text, isBot: false, audio: "" }]);
    const res = await sendMsgToOpenAI( prompt);
    isLoading(false);
    setMessages([
      ...messages,
      { text: prompt, isBot: false, audio: "" },
      { text: res, isBot: true, audio: "" },
    ]);
  };

  const handleEnter = async (e) => {
    if (e.key === "Enter") await handleSend();
  };

  return (
    <>
      
      <Navbar page="chatbot"/>
      <div className="Chatbot">
        <div className="main">
          <div className="chats">
            {messages.map((message, i) => {
              const isLastBotMessage =
                i === messages.length - 1 && message.isBot;
              return (
                <div key={i} className={message.isBot ? "chat bot" : "chat"}>
                  <FontAwesomeIcon
                    icon={message.isBot ? faRobot : faUser}
                    style={profImgStyle}
                  />
                  {isLastBotMessage && !message.isBot && loading ? (
                    <ChatLoader />
                  ) : (
                    <>
                      {message.isBot ? (
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <div style={{ padding: "5px" }}>
                            <AudioComponent msg={message.text} /> 
                          </div>
                          <div>
                            <TypeAnimation
                              sequence={[message.text]}
                              wrapper="p"
                              speed={50}
                              cursor="no"
                              repeat={1}
                            />
                          </div>
                        </div>
                      ) : (
                        <>
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        ><div>
                          {message.audio === "" ? null : (
                            <audio src={message.audio} controls ></audio>
                          )}</div>
                          <div>
                          <p className="txt">{message.text}</p></div>
                          </div>
                          {TranscriptLoading && messages.length > 0 && messages[messages.length - 1].isBot && (
        <ChatLoader />
      )}
                        </>
                      )}
                    </>
                  )}
                </div>
              );
            })}
            {messages.length > 0 &&
              !messages[messages.length - 1].isBot &&
              loading && (
                <div className="chat bot">
                  <FontAwesomeIcon icon={faRobot} style={profImgStyle} />
                  <ChatLoader />
                </div>
              )}
            <div ref={msgEnd} />
          </div>
          <div className="chatFooter">
            <div className="inp">
              
              {permission && !recordingStatus? (
                <button onClick={startRecording} className="send">
                  <FontAwesomeIcon icon={faMicrophoneSlash} style={iconStyle} />
                </button>
              ) : null}
              {recordingStatus? (
                <div className="recording-animation-container">
                <button onClick={stopRecording} className="send">
                  <FontAwesomeIcon icon={faMicrophone} style={iconStyle} />
                </button>
                <div className="recording-dot" />
                </div>

              ) : null}

           

              {/* <AudioRecorder /> */}
              <input
                type="text"
                placeholder="Send a message"
                value={Transcript != "" ? Transcript: prompt}
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
        </div>
      </div>
    </>
  );
};

export default Chatbot;
