import { data } from "../utils/db.js";

export const resolvers = {
  Query: {
    async user(_, { ID }) {
      return data.users.find((user) => user.id == ID);
    },

    async users(_, { ID }) {
      return data.users;
    },

    async foods() {
      return data.availableFoods;
    },

    async orderFoods() {
      return data.orderedFoods;
    },
  },

  Mutation: {
    async addToFavorites(_, { info }) {},
  },
};
