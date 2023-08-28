import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: {
    type: String,
    minlength: 8,
    required: true,
  },
  favorites: { type: [], default: [] },
  currentChoice: { type: String, default: "" },
});

userSchema.pre("save", async function (next) {
  const user = this;
  user.password = await bcrypt.hash(user.password, 8);
  next();

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

let User;
try {
  User = mongoose.model("users");
} catch (e) {
  User = mongoose.model("users", userSchema);
}

export default User;
