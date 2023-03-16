import { useState } from "react";
import { SOCKET_URL } from "@/config/default";
import { createContext, useContext } from "react";
import { io, Socket } from "socket.io-client";
import EVENTS from "@/config/events";

interface Context {
  socket: Socket;
  username?: string;
  setUsername: Function;
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
});

// Define a provider component that wraps its children with the socket context
const SocketProvider = (props: any) => {
  const [username, setUsername] = useState<string>("");
  const [roomId, setRoomId] = useState<string>("");
  const [rooms, setRooms] = useState({});
  socket.on(EVENTS.SERVER.ROOMS, (value) => {
    setRooms(value);
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
