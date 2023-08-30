import { handleGenerateToken } from "../actions/generateToken.js";
import Food from "../model/Food.js";
import User from "../model/User.js";
import bcrypt from "bcryptjs";

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
      function getRandomFood(choices) {
        const randomIndex = Math.floor(Math.random() * choices.length);
        return choices[randomIndex];
      }

      const users = await User.find();
      let orders = [];
      users.forEach((user) => {
        if (user.currentChoice) {
          orders.push(user.currentChoice);
        } else {
          const randomRes = getRandomFood(user.favorites);
          if (randomRes) {
            orders.push(randomRes);
          } else {
            orders.push("Domoda");
          }
        }
      });
      await User.updateMany({}, { $set: { currentChoice: "" } });
      return orders;
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
      return await user.save();
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
        { currentChoice: info.food_name }
      );
      return result;
    },
  },
};
