import React from 'react';

const ChatMessage = ({ message, isUser, timestamp }) => {
  return (
    <div className={`message-container ${isUser ? 'user-message' : 'bot-message'}`}>
      <div className={`message-bubble ${isUser ? 'user-bubble' : 'bot-bubble'}`}>
        <div className="message-content">
          {message}
        </div>
        <div className="message-time">
          {timestamp || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
      {!isUser && (
        <div className="bot-avatar">
          🤖
        </div>
      )}
    </div>
  );
};

export default ChatMessage;