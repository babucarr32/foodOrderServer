import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
  name: { type: String },
});

let Food;
try {
  Food = mongoose.model("food");
} catch (e) {
  Food = mongoose.model("food", foodSchema);
}

export default Food;
