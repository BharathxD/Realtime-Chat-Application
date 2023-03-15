import { SOCKET_URL } from "@/config/default";
import { createContext, useContext } from "react";
import { io } from "socket.io-client";

// Connect to the socket server using the provided URL
const socket = io(SOCKET_URL);

// Create a context for the socket connection
const SocketContext = createContext({ socket });

// Define a provider component that wraps its children with the socket context
const SocketProvider = (props: any) => {
  return <SocketContext.Provider value={{ socket }} {...props} />;
};

// Define a custom hook that allows components to consume the socket context
export const useSockets = () => useContext(SocketContext);

export default SocketProvider;
