import {
  Context,
  Errors,
  GET,
  Path,
  QueryParam,
  ServiceContext
} from "typescript-rest";
import { sequelize } from "../db";
import { User } from "../models";

@Path("/example")
class Example {
  @Context private context: ServiceContext;
  @Path("/test")
  @GET
  private async test(): Promise<any> {
    return "Hello World!";
  }

  @Path("/complex-test")
  @GET
  private async find(@QueryParam("search") search: string): Promise<any> {
    return new Promise<IPromiseResponse>(async (resolve, reject) => {
      const userMatch = await User.findAll({
        where: {
          email: {
            [sequelize.Op.iLike]: `%${search}%`
          }
        }
      }).catch(err =>
        reject(
          new Errors.InternalServerError(
            "A database error occured while searching for users."
          )
        )
      );
      resolve({
        data: userMatch,
        status: 201,
        message: "Found users"
      });
    }).catch(err => this.context.next(err));
  }
}

export { Example };
