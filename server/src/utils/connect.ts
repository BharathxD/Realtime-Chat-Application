import mongoose from "mongoose";
import logger from "./logger";

const connect = () => {
  try {
    mongoose.set("strictQuery", false);
    const dbUri = process.env.DB_URI;
    if (!dbUri) {
      throw new Error("Invalid DB Connection URL");
    }
    logger.info("Connecting to the Database...");
    mongoose.connect(dbUri);
    logger.info("Sucessfuly Connected to the Database ✅");
  } catch (error: any) {
    logger.error("Unexpected error has occured ❌");
    process.exit(1);
  }
};

