import { useState } from "react";
import { SOCKET_URL } from "@/config/default";
import { createContext, useContext } from "react";
import { io, Socket } from "socket.io-client";
import EVENTS from "@/config/events";

interface Context {
  socket: Socket;
  username?: string;
  setUsername: Function;
  messages?: Array<any>;
  setMessages: Function;
  roomId?: string;
  rooms: {};
}

// Connect to the socket server using the provided URL
const socket = io(SOCKET_URL);

// Create a context for the socket connection
const SocketContext = createContext<Context>({
  socket,
  setUsername: () => false,
  rooms: {},
  messages: [],
  setMessages: () => false,
});

// Define a provider component that wraps its children with the socket context
const SocketProvider = (props: any) => {
  const [username, setUsername] = useState<string>("");
  const [roomId, setRoomId] = useState<string>("");
  const [rooms, setRooms] = useState({});
  const [message, setMessages] = useState([]);
  socket.on(EVENTS.SERVER.ROOMS, (value) => {
    setRooms(value);
  });
  socket.on(EVENTS.SERVER.JOINED_ROOMS, (value) => {
    setRoomId(value);
    setMessages([]);
  });
  return (
    <SocketContext.Provider
      value={{ socket, username, setUsername, rooms, roomId }}
      {...props}
    />
  );
};

// Define a custom hook that allows components to consume the socket context
export const useSockets = () => useContext(SocketContext);

export default SocketProvider;
