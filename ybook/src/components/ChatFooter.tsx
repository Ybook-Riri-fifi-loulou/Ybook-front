import React, { useState } from 'react';

const ChatFooter = ({ socket } : any) => {
  const [message, setMessage] = useState('');

  const handleSendMessage = (e : any) => {
    e.preventDefault();
    if (message.trim() && localStorage.getItem('userName')) {
      socket.emit('message', {
        text: message,
        name: localStorage.getItem('userName'),
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
      });
    }
    
  };
  return <div className="chat__footer">
    <form onSubmit={handleSendMessage}>
        <input type="text" placeholder="Type a message" value={message} onChange={(e) => setMessage(e.target.value)} />
        <button type="submit">Envoyer</button>
    </form>
  </div>;
};

export default ChatFooter;