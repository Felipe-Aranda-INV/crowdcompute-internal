'use client';

import { useState } from 'react';
import ChatBubble from './ChatBubble';
import SuggestionChip from './SuggestionChip';

type Message = {
  text: string;
  sender: 'user' | 'other';
};

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = (text: string) => {
    if (text.trim()) {
      setMessages([...messages, { text, sender: 'user' }]);
      // In a real application, you would send the message to a server.
      // For now, we'll just simulate a response.
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: `Echo: ${text}`, sender: 'other' },
        ]);
      }, 1000);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ flex: 1, overflowY: 'auto', padding: '10px' }}>
        {messages.map((message, index) => (
          <ChatBubble key={index} message={message} />
        ))}
      </div>
      <div style={{ padding: '10px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <SuggestionChip suggestion="Yes" onClick={handleSuggestionClick} />
          <SuggestionChip suggestion="No" onClick={handleSuggestionClick} />
          <SuggestionChip suggestion="I'm not sure" onClick={handleSuggestionClick} />
        </div>
        <div style={{ display: 'flex' }}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            style={{ flex: 1, padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSendMessage(inputValue);
                setInputValue('');
              }
            }}
          />
          <button
            onClick={() => {
              handleSendMessage(inputValue);
              setInputValue('');
            }}
            style={{ marginLeft: '10px', padding: '10px', borderRadius: '5px', border: 'none', background: '#007bff', color: 'white' }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;