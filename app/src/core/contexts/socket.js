import React from 'react';
import socketio from "socket.io-client";

const ENDPOINT = "http://localhost:8080";

export const socket = socketio(ENDPOINT);
export const SocketContext = React.createContext();