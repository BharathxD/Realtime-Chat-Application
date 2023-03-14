import express, { Request, Response, NextFunction } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import config from "config";
import logger from "./utils/logger";
import { StatusCodes } from "http-status-codes";

const app = express();

const PORT = config.get<string>("PORT") || 4000;

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    methods: "*",
  })
);

app.get("/health-check", (req: Request, res: Response, next: NextFunction) => {
  res.status(StatusCodes.OK).send({ message: "OK" });
  next();
});

const server = app.listen(PORT, () => {
  logger.info(`The server is running at http://localhost:${PORT}`);
});
