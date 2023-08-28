import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  foodName: { type: String },
  username: { type: String },
  user_id: { type: String },
});

let Order;
try {
  Order = mongoose.model("order");
} catch (e) {
  Order = mongoose.model("order", orderSchema);
}

export default Order;
