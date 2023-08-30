import User from "../model/User.js";
import { twilioMessage } from "./TwillioMsg.js";

export async function getOrders() {
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
        orders.push(randomRes.foodName);
      } else {
        orders.push("Domoda");
      }
    }
  });
  twilioMessage(JSON.stringify(orders));

  await User.updateMany({}, { $set: { currentChoice: "" } });
}
