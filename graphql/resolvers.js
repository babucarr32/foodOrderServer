import Food from "../model/Food.js";
import User from "../model/User.js";
import { data } from "../utils/db.js";

export const resolvers = {
  Query: {
    async user(_, { ID }) {
      return await User.findById(ID);
    },

    async users() {
      return await User.find();
    },

    async foods() {
      return data.availableFoods;
    },

    async orderFoods() {
      return data.orderedFoods;
    },
  },

  Mutation: {
    async createAccount(_, { credentials }) {
      const user = new User({
        ...credentials,
      });
      return await user.save();
    },

    async addFood(_, { foodName }) {
      const food = new Food({
        name: foodName,
      });
      return await food.save();
    },
    async addToFavorites(_, { info }) {},
  },
};
