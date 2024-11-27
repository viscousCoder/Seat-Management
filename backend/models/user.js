const mongoose = require("mongoose");
const { createToken } = require("../service/auth");

const userSchema = mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: Number, required: true },
  age: { type: Number, required: true },
});

userSchema.static("matchPassword", async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) throw new Error("user not found");
  if (user.password !== password) throw new Error("Password not matched");
  const token = createToken(user);
  return token;
});

const User = mongoose.model("user", userSchema);

module.exports = User;
