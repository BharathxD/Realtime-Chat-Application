import { useSockets } from "@/context/socket.context";
import MessagesContainer from "@/container/Messages";
import RoomsContainer from "@/container/Rooms";
import { useRef } from "react";

const Home = () => {
  const { socket, username, setUsername } = useSockets();
  const usernameRef = useRef<HTMLInputElement>(null);
  const handleSetUsername = () => {
    const value = usernameRef.current!.value;
    if (!value) {
      return;
    }
    setUsername(value);
    localStorage.setItem("username", value);
  };
  return (
    <div>
      {!username && (
        <div>
          <input type="text" placeholder="Username" ref={usernameRef} />
          <button onClick={handleSetUsername}>Start</button>
        </div>
      )}
      {username && (
        <>
          <RoomsContainer />
          <MessagesContainer />
        </>
      )}
    </div>
  );
};

export default Home;
