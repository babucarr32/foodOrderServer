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
      if (
        !credentials.newPassword &&
        !credentials.currentPassword &&
        credentials.username
      ) {
        const result = await User.findOneAndUpdate(
          { _id: credentials.user_id },
          { username: credentials.username }
        );
        return result;
      } else {
        const result = await User.findById({ _id: credentials.user_id });

        const isPasswordMatch = await bcrypt.compare(
          credentials.currentPassword,
          result.password
        );

        if (isPasswordMatch) {
          const result = await User.findOneAndUpdate(
            { _id: credentials.user_id },
            {
              username: credentials.username,
              password: credentials.newPassword,
            }
          );
          return result;
        }
        return null;
      }
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
          const accessToken = handleGenerateToken(result._id);
          return { id: result._id, ...result._doc, accessToken };
        }
      }
      return null;
    },

    async createAccount(_, { credentials }) {
      const user = new User({
        ...credentials,
      });
      const result = await user.save();

      if (result) {
        const accessToken = handleGenerateToken(result._id);
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
