import { Socket, Server } from "socket.io";
import logger from "./logger";

const enum EVENTS {
  connection = "connection",
}

const socket = ({ io }: { io: Server }) => {
  logger.info(`Socket Enabled`);
  io.on(EVENTS.connection, (socket: Socket) => {
    logger.info(`User connected ${socket.id}`);
  });
};

export default socket;
