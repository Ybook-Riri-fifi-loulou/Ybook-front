import React, { useState, useEffect } from 'react';
import { User } from '../hooks/useAuth';

const ChatBar = ({ socket } : any) => {
  const [users, setUsers] = useState([] as (User & {userName: string} & {socketID: number})[]);

  useEffect(() => {
    socket.on('newUserResponse', (data : any) => setUsers(data));
  }, [socket, users]);

  return (
    <div className="chat__sidebar">
      <h2>Ouvrir Chat</h2>
      <div>
        <h4 className="chat__header">Utilisateurs</h4>
        <div className="chat__users">
          {users.map((user) => (
            <p key={user.socketID}>{user.userName}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatBar;