import * as bodyParser from "body-parser";
import * as express from "express";
import { HttpMethod, Server as tsServer } from "typescript-rest";
import api from "./api";
import { config } from "./config";
import { umzug } from "./migrate";
import * as db from "./models";
const listEndpoints = require("express-list-endpoints");

export class Server {
  // express ref
  public express: express.Application;
  private server: any;

  constructor() {
    this.express = express();
    this.middleware();

    db.bootstrap();
    umzug.up();

    tsServer.buildServices(this.express, ...api);

    // tslint:disable-next-line:no-console
    console.log(
      tsServer
        .getPaths()
        .map(
          serverPath =>
            `${serverPath} has ${tsServer
              .getHttpMethods(serverPath)
              .map(m => HttpMethod[m])}`
        )
    );

    tsServer.swagger(this.express, "./swagger/swagger.yaml", "/api-docs");

  }

  public start() {
    return new Promise<any>((resolve, reject) => {
      this.server = this.express.listen(config.PORT || 4500, (err: any) => {
        if (err) {
          return reject(err);
        }
        // tslint:disable-next-line:no-console
        console.log(
          `App is running at http://localhost:${config.PORT || 4500}`
        );

        return resolve();
      });
    });
  }

  public stop() {
    return new Promise<boolean>((resolve, reject) => {
      if (this.server) {
        this.server.close(() => {
          return resolve(true);
        });
      } else {
        return resolve(true);
      }
    });
  }

  private middleware() {
    this.express.use(bodyParser.json());

    // ## CORS middleware
    //
    // see: http://stackoverflow.com/questions/7067966/how-to-allow-cors-in-express-nodejs
    const allowCrossDomain = (req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
      res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

      if (req.method === "OPTIONS") {
        res.send(200);
      } else {
        next();
      }
    };
    this.express.use(allowCrossDomain);
  }
}
