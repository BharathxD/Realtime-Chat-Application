import { useState } from "react";
import { SOCKET_URL } from "@/config/default";
import { createContext, useContext } from "react";
import { io, Socket } from "socket.io-client";
import EVENTS from "@/config/events";

export type TMessages = { message: string; time: string; username: string }[];

interface Context {
  socket: Socket;
  username?: string;
  setUsername: Function;
  messages?: TMessages;
  setMessages: Function;
  roomId?: string;
  rooms: { _: string; name: string }[];
}

// Connect to the socket server using the provided URL
const socket = io(SOCKET_URL);

// Create a context for the socket connection
const SocketContext = createContext<Context>({
  socket,
  setUsername: () => false,
  rooms: [],
  messages: [],
  setMessages: () => false,
});

// Define a provider component that wraps its children with the socket context
const SocketProvider = (props: any) => {
  const [username, setUsername] = useState<string>("");
  const [roomId, setRoomId] = useState<string>("");
  const [rooms, setRooms] = useState({});
  const [messages, setMessages] = useState<Array<any>>([]);
  socket.on(EVENTS.SERVER.ROOMS, (value) => {
    setRooms(value);
  });
  socket.on(EVENTS.SERVER.JOINED_ROOMS, (value) => {
    setRoomId(value);
    setMessages([]);
  });
  socket.on(EVENTS.SERVER.ROOM_MESSAGE, ({ message, username, time }) => {
    setMessages([...messages, { message, username, time }]);
  });
  return (
    <SocketContext.Provider
      value={{
        socket,
        username,
        setUsername,
        rooms,
        roomId,
        messages,
        setMessages,
      }}
      {...props}
    />
  );
};

// Define a custom hook that allows components to consume the socket context
export const useSockets = () => useContext(SocketContext);

export default SocketProvider;
