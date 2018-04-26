/// <reference path="interfaces.ts" />
import { Server } from "./server";

const startServer = () => {
  return new Promise((resolve, reject) => {
    const apiServer = new Server();
    apiServer
      .start()
      .then(resolve)
      .catch(reject);

    const graceful = () => {
      apiServer.stop().then(() => process.exit(0));
    };

    // Stop graceful
    process.on("SIGTERM", graceful);
    process.on("SIGINT", graceful);
  });
};

startServer().catch(err => {
  console.error(`Error starting server: ${err.message}`);
  process.exit(-1);
});
