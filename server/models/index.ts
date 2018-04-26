import User from "./user";

export const bootstrap = () => {
  User.sync();
};

export { User }

