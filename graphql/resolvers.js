import Food from "../model/Food.js";
import Order from "../model/Orders.js";
import User from "../model/User.js";

export const resolvers = {
  Query: {
    async user(_, { ID }) {
      return await User.findById(ID);
    },

    async users() {
      return await User.find();
    },

    async foods() {
      return await Food.find();
    },

    async orders() {
      return await User.find();
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

    async addToFavorites(_, { info }) {
      console.log(info);
      const result = await User.findOneAndUpdate(
        {
          _id: info.user_id,
        },
        {
          $addToSet: {
            favorites: { food_id: info.food_id, foodName: info.food_name },
          },
        }
      );

      return result;
    },

    async removeFromFavorites(_, { info }) {
      const result = await User.findOneAndUpdate(
        {
          _id: info.user_id,
        },
        {
          $pull: {
            favorites: { food_id: info.food_id },
          },
        }
      );
      return result;
    },

    async makeOrder(_, { info }) {
      const result = await User.findOneAndUpdate(
        { _id: info.user_id },
        { currentChoice: info.food_name }
      );
      return result;
    },
  },
};
