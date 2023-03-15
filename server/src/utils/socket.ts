import { Socket, Server } from "socket.io";
import logger from "./logger";

const enum EVENTS {
  connection = "connection",
}

const socket = ({ io }: { io: Server }) => {
  io.on(EVENTS.connection, (socket: Socket) => {
    try {
      logger.info(`User connected ${socket.id}`);
    } catch (error: any) {
      logger.error("Error connecting to Socket");
    }
  });
};

export default socket;
