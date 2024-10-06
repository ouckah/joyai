const mongoose = require("mongoose");
const { Schema, model } = mongoose;  // Destructure Schema and model from mongoose

// Define the user schema
const UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Email is invalid",
      ],
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: [true, "Name is required"],
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Check if the User model already exists, otherwise create a new one
const User = mongoose.models?.User || model('User', UserSchema);

// Export the User model for use in other parts of the app
module.exports = User;
