import React, { useState, useRef, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./Chatbot.css";
import "regenerator-runtime/runtime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ChatLoader from "../../components/ChatLoader/ChatLoader";
import {
  faPaperPlane,
  faMicrophone,
  faMicrophoneSlash,
} from "@fortawesome/free-solid-svg-icons";
import { downloadTranscript, requestFeedback, sendMsgToOpenAI } from "../../services/chats.js";
import convertSpeechToText from "../../services/SpeechToTextAPI";
import ChatMessages from "../../components/ChatMessages/ChatMessages.jsx";

const parameters = JSON.parse(localStorage.getItem("formData"));

const iconStyle = {
  height: "2rem",
  padding: "0 1rem",
  color: "white",
};



const Chatbot = () => {
  const [pageLoading, isPageLoading] = useState(true);
  const [botLoading, isBotLoading] = useState(false);
  const [feedbackLoading, isFeedbackLoading] = useState(false);
  const [TranscriptLoading, setTranscriptLoading] = useState(false);

  const [EndOfInterview, isEndOfInterview] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [feedback, setFeedback] = useState("");
  const [permission, setPermission] = useState(false); //REMEMBER TO SET TO FALSE
  const mediaRecorder = useRef(null);

  const [stream, setStream] = useState(null);
  const [audio, setAudio] = useState([]);
  const [audioChunks, setAudioChunks] = useState([]);
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

  const checkEndOfInterview = async () => {
    if (localStorage.getItem("EndOfInterview") == "true") {
      document.getElementById("UserInput").disabled = true;
      isEndOfInterview(true);
      isFeedbackLoading(true);
      const interviewFeedback = await requestFeedback();
      downloadTranscript();
      isFeedbackLoading(false);
      setFeedback(interviewFeedback);
    }
  };

  const getMicrophonePermission = async () => {
    if ("MediaRecorder" in window) {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        // setPermission(true);
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
              <ChatMessages
                messages={messages}
                botLoading={botLoading}
                TranscriptLoading={TranscriptLoading}
                feedback={feedback}
                feedbackLoading={feedbackLoading}
                EndOfInterview={EndOfInterview}
              />

              {EndOfInterview ? (
                ""
              ) : (
                <div className="chatFooter">
                  <div className="inp">
                    {!recordingStatus ? (
                      <button onClick={startRecording} className="send" id="micmute" aria-label="Mute Microphone">
                        <FontAwesomeIcon
                          icon={faMicrophoneSlash}
                          style={iconStyle}
                        />
                      </button>
                    ) : (
                      <div className="recording-animation-container">
                        <button onClick={stopRecording} className="send" id="micon" aria-label="Start Recording">
                          <FontAwesomeIcon
                            icon={faMicrophone}
                            style={iconStyle}
                          />
                        </button>
                        <div className="recording-dot" />
                      </div>
                    )}

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
                    <button className="send" onClick={handleSend} id="sendMsg" aria-label="Send Message">
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
