import { Server } from "http";
import { app } from "./app";
import envConfig from "./envConfig";

async function connectDb() {
  const server: Server = app.listen(envConfig.port, () => {
    console.log("server running on port", envConfig.port);
  });
  const existServer = () => {
    if (server) {
      server.close(() => {
        console.log("server is closed");
      });
    }
    process.exit(1);
  };

  const unexpectedErrorHandler = (error: unknown) => {
    console.log(error);
    existServer();
  };

  process.on("uncaughtException", unexpectedErrorHandler);
  process.on("unhandledRejection", unexpectedErrorHandler);
}

connectDb();
