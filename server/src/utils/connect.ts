import mongoose from "mongoose";
import logger from "./logger";

export const connect = async () => {
  try {
    mongoose.set("strictQuery", false);
    const dbUri = process.env.DB_URI;
    console.log(dbUri);
    if (!dbUri) {
      throw new Error("Invalid DB Connection URL");
    }
    logger.info("Connecting to the Database...");
    await mongoose.connect(dbUri);
    logger.info("Sucessfuly Connected to the Database ✅");
  } catch (error: any) {
    logger.error("Unexpected error has occured ❌");
    console.log(error);
    process.exit(1);
  }
};

export const disconnect = async () => {
  try {
    await mongoose.connection.close();
  } catch (error: any) {
    logger.error("Problem disconnecting from the Database");
  } finally {
    return;
  }
};
