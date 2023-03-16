import { Socket, Server } from "socket.io";
import logger from "./logger";

const EVENTS = {
  CONNECTION: "connection",
  CLIENT: {
    CREATE_ROOM: "CREATE_ROOM",
  },
};

const socket = ({ io }: { io: Server }) => {
  io.on(EVENTS.CONNECTION, (socket: Socket) => {
    try {
      logger.info(`User connected ${socket.id}`);
      socket.on(EVENTS.CLIENT.CREATE_ROOM, ({ roomName }) => {
        // TODO: CREATE ROOM ID
        // TODO: ADD A NEW ROOM TO THE ROOMS OBJECTS
        // TODO: JOIN THE ROOM
        // TODO: BROADCAST THE ROOMS
        // TODO: EMIT BACK TO THE ROOM CREATOR WITH ALL THE ROOMS
        // TODO: EMIT EVENT BACK WITH A NEW ROOM CREATION MESSAGE
        console.log(roomName);
      });
    } catch (error: any) {
      logger.error("Error connecting to Socket");
    }
  });
};

export default socket;
