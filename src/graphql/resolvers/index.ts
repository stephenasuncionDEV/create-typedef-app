import { getUserByID, getUserByEmail } from "./user/controller";

export const resolvers = {
  Query: {
    getUserByID,
    getUserByEmail,
  },
};
