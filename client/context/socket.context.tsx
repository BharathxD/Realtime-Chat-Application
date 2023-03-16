import { useState } from "react";
import { SOCKET_URL } from "@/config/default";
import { createContext, useContext } from "react";
import { io, Socket } from "socket.io-client";

interface Context {
  socket: Socket;
  username?: string;
  setUsername: Function;
}

// Connect to the socket server using the provided URL
const socket = io(SOCKET_URL);

// Create a context for the socket connection
const SocketContext = createContext<Context>({
  socket,
  setUsername: () => false,
});

// Define a provider component that wraps its children with the socket context
const SocketProvider = (props: any) => {
  const [username, setUsername] = useState();
  return <SocketContext.Provider value={{ socket }} {...props} />;
};

// Define a custom hook that allows components to consume the socket context
export const useSockets = () => useContext(SocketContext);

export default SocketProvider;
