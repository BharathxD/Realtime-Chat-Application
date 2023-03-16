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
    const roomName = newRoomRef.current!.value;
    socket.emit(EVENTS.CLIENT.CREATE_ROOM, { roomName });
    newRoomRef.current.value = "";
  };
  return (
    <nav>
      <div>
        <input type="text" placeholder="Room Name" ref={newRoomRef} />
        <button onClick={handleCreateRoom}>Create Room</button>
      </div>
      {Object.keys(rooms).map((key) => {
        return <div key={key}>{rooms[key].name}</div>;
      })}
    </nav>
  );
};

export default RoomsContainer;
