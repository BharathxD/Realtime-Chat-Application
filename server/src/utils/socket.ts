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
    } catch (error: any) {
      logger.error("Error connecting to Socket");
    }
  });
};

export default socket;
