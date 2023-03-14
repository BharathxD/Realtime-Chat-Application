import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import config from "config";

const app = express();

const PORT = config.get<string>("PORT");

console.log(PORT);
