import { handleGenerateToken } from "../actions/generateToken.js";
import Food from "../model/Food.js";
import User from "../model/User.js";
import bcrypt from "bcryptjs";
import { handleVerifyToken } from "../utils/VerifyToken.js";

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
      throw Error("No orders");
    },
  },

  Mutation: {
    async editAccount(_, { credentials }) {
      const result = await User.findOneAndUpdate(
        { _id: credentials.user_id },
        { ...credentials }
      );
      return result;
    },

    async deleteAccount(_, { ID }) {
      try {
        await User.findByIdAndDelete(ID);
        return true;
      } catch (error) {
        return false;
      }
    },

    async login(_, { credentials }) {
      const result = await User.findOne({ username: credentials.username });
      if (result) {
        const isPasswordMatch = await bcrypt.compare(
          credentials.password,
          result.password
        );
        if (isPasswordMatch) {
          const accessToken = handleGenerateToken(result.username);
          return { id: result._id, ...result._doc, accessToken };
        }
      }
      throw new Error("Username or password incorrect");
    },

    async createAccount(_, { credentials }) {
      const user = new User({
        ...credentials,
      });
      const result = await user.save();

      if (result) {
        const accessToken = handleGenerateToken(result.username);
        return { id: result._id, ...result._doc, accessToken };
      }
    },

    async addFood(_, { foodName }) {
      const food = new Food({
        name: foodName,
      });
      return await food.save();
    },

    async addToFavorites(_, { info }) {
      const result = await User.findOneAndUpdate(
        { _id: info.user_id },
        {
          $addToSet: {
            favorites: { foodName: info.food_name },
          },
        },
        { new: true }
      );
      return result;
    },

    async removeFromFavorites(_, { info }) {
      const result = await User.findOneAndUpdate(
        { _id: info.user_id },
        {
          $pull: {
            favorites: { foodName: info.food_name },
          },
        },
        { new: true }
      );
      return result;
    },

    async makeOrder(_, { info }) {
      const result = await User.findOneAndUpdate(
        { _id: info.user_id },
        { currentChoice: info.food_name },
        { new: true }
      );
      return result;
    },

    async verifyJWTToken(_, { token }) {
      return handleVerifyToken(token);
    },
  },
};
