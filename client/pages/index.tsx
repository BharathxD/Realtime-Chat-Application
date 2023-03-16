import { useSockets } from "@/context/socket.context";
import MessagesContainer from "@/container/Messages";
import RoomsContainer from "@/container/Rooms";

const Home = () => {
  const { socket } = useSockets();
  return (
    <div>
      <RoomsContainer />
      <MessagesContainer />
    </div>
  );
};

export default Home;
