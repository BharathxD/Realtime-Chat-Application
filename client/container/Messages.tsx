import { TMessages, useSockets } from "@/context/socket.context";
import { useRef } from "react";
import EVENTS from "@/config/events";

const MessagesContainer = () => {
  const { socket, messages, roomId, username, setMessages } = useSockets();
  const messageRef = useRef<HTMLTextAreaElement>(null);
  if (!roomId) {
    <div>Room ID not Found</div>;
  }
  const handleSubmit = () => {
    if (!messageRef.current) {
      return;
    }

    const message = messageRef.current.value;
    socket.emit(EVENTS.CLIENT.SEND_ROOM_MESSAGE, { roomId, message, username });
    const date = new Date();

    setMessages((prevMessages: TMessages) => [
      ...prevMessages,
      {
        username: "user",
        message,
        time: `${date.getHours()}:${date.getMinutes()}`,
      },
    ]);

    messageRef.current.value = "";
  };
  return (
    <div>
      {messages?.map(({ message }, index) => {
        return <p key={index}>{message}</p>;
      })}
      {
        <div>
          <textarea ref={messageRef} placeholder="Message" rows={1}></textarea>
          <button onClick={handleSubmit}>Send</button>
        </div>
      }
    </div>
  );
};

export default MessagesContainer;
