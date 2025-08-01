'use client';

type Props = {
  message: {
    text: string;
    sender: 'user' | 'other';
  };
};

const ChatBubble = ({ message }: Props) => {
  const isUser = message.sender === 'user';
  return (
    <div style={{ display: 'flex', justifyContent: isUser ? 'flex-end' : 'flex-start' }}>
      <div
        style={{
          background: isUser ? '#007bff' : '#e9e9eb',
          color: isUser ? 'white' : 'black',
          padding: '10px',
          borderRadius: '10px',
          maxWidth: '70%',
        }}
      >
        {message.text}
      </div>
    </div>
  );
};

export default ChatBubble;