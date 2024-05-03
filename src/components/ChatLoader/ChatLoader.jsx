import React from 'react';
import './ChatLoader.css'; // Create a CSS file for styling

const ChatLoader = () => {
  return (
    <div className="chat-loader-container" data-testid="chat-loader-container">
      <div className="dot dot1" data-testid="dot"></div>
      <div className="dot dot2" data-testid="dot"></div>
      <div className="dot dot3" data-testid="dot"></div>
    </div>
  );
};

export default ChatLoader;