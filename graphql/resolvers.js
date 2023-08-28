import { data } from "../utils/db.js";

export const resolvers = {
  Query: {
    async user(_, { ID }) {
      return data.users.find((user) => user.id == ID);
    },
  },
};
