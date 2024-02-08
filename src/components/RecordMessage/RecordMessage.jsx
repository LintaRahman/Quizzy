import { ReactMediaRecorder } from "react-media-recorder";
import RecordIcon from "./RecordIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMicrophone,
  faMicrophoneSlash,
} from "@fortawesome/free-solid-svg-icons";
// const Props = {
//   handleStop: any
// };

const iconStyle = {
  height: "2rem",
  padding: "0 1rem",
  color: "white",
};

const RecordMessage = ({ handlestop }) => {

  
  return (
    <ReactMediaRecorder
      audio
      onStop={handlestop}
      render={({ status, startRecording, stopRecording }) => (
        // <div className="mt-2">
        <div className="recording-animation-container">
          <button
            onMouseDown={startRecording}
            onMouseUp={stopRecording}
            // className="bg-white p-4 rounded-full"
            className="send"
          >
            {status === "recording" ? (
                <FontAwesomeIcon
                  icon={faMicrophone}
                  style={{
                    color: "red",
                    animation: "pulse 20s infinite",
                    height: "2rem",
                    padding: "0 1rem",
                  }}
                />
            ) : (
                <FontAwesomeIcon icon={faMicrophone} style={iconStyle} />
            )}
            {/* <RecordIcon
              classText={
                status == "recording"
                  ? "animate-pulse text-red-500"
                  : "text-sky-500"
              }
            /> */}
          </button>
          {status === "recording" ? <div className="recording-dot" /> : null}
         {/* <p className="mt-2 text-white font-light">{status}</p> */}
        </div>
      )}
    />
  );
};

export default RecordMessage;
