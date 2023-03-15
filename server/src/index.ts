import express, { Request, Response, NextFunction } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import config from "config";
import logger from "./utils/logger";
import { StatusCodes } from "http-status-codes";
import { connect, disconnect } from "./utils/connect";

const app = express();

const PORT = config.get<string>("PORT") || 4000;

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    methods: "*",
  })
);

app.get("/", (_: Request, res: Response, next: NextFunction) => {
  res.status(StatusCodes.OK).send({ message: "Server is running" });
  next();
});

const server = app.listen(PORT, async () => {
  logger.info(`The server is running at http://localhost:${PORT}`);
  await connect();
});

const SIGNALS = ["SIGTERM", "SIGINT"];

const gracefulShutdown = (signal: string) => {
  process.once(signal, async () => {
    try {
      await Promise.all([
        new Promise<void>((resolve, reject) => {
          server.close((err) => {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          });
        }),
        // TODO: Disconnect from Database
        disconnect(),
      ]);
      console.log("Server and database are now disconnected");
      process.exit(0);
    } catch (error: any) {
      logger.error("Error while shutting down");
      process.exit(1);
    }
  });
};

for (const SIGNAL in SIGNALS) {
  gracefulShutdown(SIGNAL);
}
