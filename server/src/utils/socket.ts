import { Socket, Server } from "socket.io";
import logger from "./logger";
import { v4 as uuidv4 } from "uuid";

const EVENTS = {
  CONNECTION: "connection",
  CLIENT: {
    CREATE_ROOM: "CREATE_ROOM",
  },
  SERVER: {
    ROOMS: "ROOMS",
    JOINED_ROOMS: "JOINED_ROOMS",
  },
};

const rooms: Record<string, { name: string }> = {};

const socket = ({ io }: { io: Server }) => {
  io.on(EVENTS.CONNECTION, (socket: Socket) => {
    try {
      socket.on(EVENTS.CLIENT.CREATE_ROOM, ({ roomName }) => {
        // TODO: CREATE ROOM ID
        const roomId = uuidv4();
        // TODO: ADD A NEW ROOM TO THE ROOMS OBJECTS
        rooms[roomId] = {
          name: roomName,
        };
        // TODO: JOIN THE ROOM
        socket.join(roomId);
        // TODO: BROADCAST THE ROOMS
        socket.broadcast.emit(EVENTS.SERVER.ROOMS, rooms);
        // TODO: EMIT BACK TO THE ROOM CREATOR WITH ALL THE ROOMS
        socket.emit(EVENTS.SERVER.ROOMS, rooms);
        // TODO: EMIT EVENT BACK WITH A NEW ROOM CREATION MESSAGE
        socket.emit(EVENTS.SERVER.JOINED_ROOMS, roomId);
      });
    } catch (error: any) {
      logger.error("Error connecting to Socket");
    }
  });
};

export default socket;
