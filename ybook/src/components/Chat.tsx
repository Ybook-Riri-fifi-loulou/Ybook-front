import React, { useEffect, useState } from 'react';
import { useGlobal } from '../providers/GlobalProvider';
import ChatBar from './ChatBar';
import ChatBody from './ChatBody';
import ChatFooter from './ChatFooter';

const ChatPage = ({ socket }: any) => {
  const [messages, setMessages] = useState<string[]>([]);
  const { userInfo } = useGlobal();

  useEffect(() => {
    socket.on('messageResponse', (data :any) => setMessages([...messages, data]));
    socket.emit('newUser', { userName:userInfo!.email , socketID: socket.id });
  }, [socket, messages]);

  return (
    <div className="chat">
      <ChatBar socket={socket} />
      <div className="chat__main">
        <ChatBody messages={messages} />
        <ChatFooter socket={socket} />
      </div>
    </div>
  );
};

export default ChatPage;