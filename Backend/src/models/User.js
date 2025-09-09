import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Name is required"],
    minlength: [2, "Name must be at least 2 characters long"],
    trim: true,
  },
  lastName: {
    type: String,
    minlength: [2, "Name must be at least 2 characters long"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: "Invalid email format",
    },
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters long"],
    // select: false,
    validate: {
      validator: (value) => validator.isStrongPassword(value, { minSymbols: 1 }),
      message: "Password must contain uppercase, lowercase, number, and be at least 6 characters",
    },
  },
}, { timestamps: true });


userSchema.pre('deleteOne', { document: true, query: false }, async function(next) {
  console.log(`User ${this._id} is being deleted. Deleting their links...`);
  await Link.deleteMany({ userId: this._id });
  next();
});

export default mongoose.model("User", userSchema);
