import React, { useState, useEffect } from 'react';
import './RecorderAnimation.css'; // Create a CSS file for styling

const RecordingAnimation = () => {
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    // Cleanup the animation when the component unmounts
    return () => {
      setIsRecording(false);
    };
  }, []);

  const startRecording = () => {
    setIsRecording(true);
    // Your recording logic here
  };

  const stopRecording = () => {
    setIsRecording(false);
    // Your stop recording logic here
  };

  return (
    <div className="recording-animation-container">
      <button onClick={startRecording} disabled={isRecording}>
        Start Recording
      </button>
      <button onClick={stopRecording} disabled={!isRecording}>
        Stop Recording
      </button>
      {isRecording && <div className="recording-dot" />}
    </div>
  );
};

export default RecordingAnimation;
