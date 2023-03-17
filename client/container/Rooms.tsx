import EVENTS from "@/config/events";
import { useSockets } from "@/context/socket.context";
import { useRef } from "react";

const RoomsContainer = () => {
  const { socket, roomId, rooms } = useSockets();
  console.log(rooms)
  const newRoomRef = useRef<HTMLInputElement>(null);
  const handleJoinRoom = (key: string) => {
    if (key === roomId) return;
    socket.emit(EVENTS.CLIENT.JOIN_ROOM, { key });
  };
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
      {Object.keys(rooms).map((key: string) => {
        return (
          <div key={key}>
            <button
              disabled={key === roomId}
              title={`Join ${rooms[key].name}`}
              onClick={() => handleJoinRoom(key)}
            >
              {rooms[key].name}
            </button>
          </div>
        );
      })}
    </nav>
  );
};

export default RoomsContainer;
