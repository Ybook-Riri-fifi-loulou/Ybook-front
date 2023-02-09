import React, { PropsWithChildren, useReducer, useState, useContext, useEffect } from "react";
import { useSocket } from "../hooks/useSocket";
import SocketContext, { defaultSocketContextState, SocketContextProvider, SocketReducer } from "../providers/SocketProvider";

export interface ISocketContextComponentProps extends PropsWithChildren {}
export interface IChatProps {}

export const SocketContextComponent: React.FC<ISocketContextComponentProps> = (props) => {
    const {children} = props;

    const socket = useSocket('ws://localhost:1337', {
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        autoConnect: false
    });

    const [SocketState, SocketDispatch] = useReducer(SocketReducer, defaultSocketContextState);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        socket.connect();
        SocketDispatch({ type: 'update_socket', payload: socket });
        StartListeners();
        SendHandshake();
    }, []);

    const StartListeners = () => {

        socket.on('user_connected', (users: string[]) => {
            console.info('User connected message received');
            SocketDispatch({ type: 'update_users', payload: users });
        });

        socket.on('user_disconnected', (uid: string) => {
            console.info('User disconnected message received');
            SocketDispatch({ type: 'remove_user', payload: uid });
        });

        socket.io.on('reconnect', (attempt) => {
            console.info('Reconnected on attempt: ' + attempt);
            SendHandshake();
        });

        socket.io.on('reconnect_attempt', (attempt) => {
            console.info('Reconnection Attempt: ' + attempt);
        });

        socket.io.on('reconnect_error', (error) => {
            console.info('Reconnection error: ' + error);
        });

        socket.io.on('reconnect_failed', () => {
            console.info('Reconnection failure.');
            alert('We are unable to connect you to the chat service.  Please make sure your internet connection is stable or try again later.');
        });
    };

    const SendHandshake = async () => {
        console.info('Sending handshake to server ...');

        socket.emit('handshake', async (uid: string, users: string[]) => {
            console.info('User handshake callback message received');
            SocketDispatch({ type: 'update_users', payload: users });
            SocketDispatch({ type: 'update_uid', payload: uid });
        });

        setLoading(false);
    };

    if (loading) return <p>Loading...</p>;


    return <SocketContextProvider value={{SocketState, SocketDispatch}}>{children}</SocketContextProvider>;
}

export const Chat: React.FC<IChatProps> = (props) => {
    const {socket, uid, users} = useContext(SocketContext).SocketState;

    return (
        <div>
            <h2>Socket IO Information</h2>
            <p>
                Your user ID is: <span>{uid}</span>
                Users online: <span>{users.length}</span>
                SocketID: <span>{socket?.id}</span>
            </p>
        </div>
    );
}