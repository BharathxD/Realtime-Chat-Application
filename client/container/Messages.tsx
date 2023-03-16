import { useSockets } from "@/context/socket.context";
import { useRef } from "react";

const MessagesContainer = () => {
  const { socket, messages, roomId, username } = useSockets();

  if (!roomId) {
    <div>Room ID not Found</div>;
  }

  return (
    <div>
      {messages?.map((message, index) => {
        return <p key={index}>{JSON.stringify(message)}</p>;
      })}
      <div>
        <textarea ref={} placeholder="Message" rows={1}></textarea>
      </div>
    </div>
  );
};

export default MessagesContainer;
