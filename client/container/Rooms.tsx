import EVENTS from "@/config/events";
import { useSockets } from "@/context/socket.context";
import { useRef } from "react";

const RoomsContainer = () => {
  const { socket, roomId, rooms } = useSockets();
  const newRoomRef = useRef<HTMLInputElement>(null);
  const handleCreateRoom = () => {
    if (!newRoomRef.current) {
      return;
    }
    const room = newRoomRef.current!.value;
    socket.emit(EVENTS.CLIENT.CREATE_ROOM);
    newRoomRef.current.value = "";
  };
  return (
    <nav>
      <div>
        <input type="text" placeholder="Room Name" ref={newRoomRef} />
        <button onClick={handleCreateRoom}>Create Room</button>
      </div>
    </nav>
  );
};

export default RoomsContainer;
