import { useSockets } from "@/context/socket.context";

const Home = () => {
  const { socket } = useSockets();
  return (
    <>
      <div>{socket.id}</div>
    </>
  );
};

export default Home;
