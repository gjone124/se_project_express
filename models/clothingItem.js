const mongoose = require("mongoose");
const validator = require("validator");

const clothingItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  weather: {
    type: String,
    required: true,
    enum: ["hot", "warm", "cold"], // Enum validator to restrict the weather types
  },
  imageUrl: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return validator.isURL(value); // Validate that the value is a valid URL
      },
      message: "You must enter a valid URL for the image", // Custom error message
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the 'User' model for the author
    required: true,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the 'User' model for users who liked the item
      default: [], // Default to an empty array
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now, // Default to the current date and time
  },
});

module.exports = mongoose.model("item", clothingItemSchema);
