const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { JWT_SECRET } = require("../utils/config");
const {
  BAD_REQUEST_ERROR,
  CONFLICT_ERROR,
  NOT_FOUND_ERROR,
  INTERNAL_SERVER_ERROR,
  UNAUTHORIZED_ERROR,
} = require("../utils/errors");

// CRUD (Create, Read, Update, Delete)

// Create (POST /users route)

const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;

  if (!name) {
    return res
      .status(BAD_REQUEST_ERROR)
      .send({ message: "Name is a required field." });
  }

  if (!avatar) {
    return res
      .status(BAD_REQUEST_ERROR)
      .send({ message: "Avatar is a required field." });
  }

  if (!email) {
    return res
      .status(BAD_REQUEST_ERROR)
      .send({ message: "Email address is a required field." });
  }

  if (!password) {
    return res
      .status(BAD_REQUEST_ERROR)
      .send({ message: "Password is a required field." });
  }

  return User.findOne({ email }).then((existingUser) => {
    if (existingUser) {
      return res.status(CONFLICT_ERROR).send({
        message: "A user with this email address already exists.",
      });
    }

    return bcrypt
      .hash(password, 10)
      .then((hashedPassword) =>
        User.create({
          name,
          avatar,
          email,
          password: hashedPassword,
        })
      )
      .then((user) => {
        const userResponse = {
          _id: user._id,
          name: user.name,
          avatar: user.avatar,
          email: user.email,
        };
        return res.status(201).send(userResponse);
      })
      .catch((err) => {
        console.error("Error creating user:", err);
        if (err.name === "ValidationError") {
          return res
            .status(BAD_REQUEST_ERROR)
            .send({ message: "Invalid data provided for user creation." });
        }

        return res
          .status(INTERNAL_SERVER_ERROR)
          .send({ message: "An error occurred on the server." });
      });
  });
};

// Create
const login = (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res
      .status(BAD_REQUEST_ERROR)
      .send({ message: "Email address is required." });
  }

  if (!password) {
    return res
      .status(BAD_REQUEST_ERROR)
      .send({ message: "Password is required." });
  }

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });

      return res.status(200).send({ token });
    })
    .catch((err) => {
      console.error("Login error:", err.message);
      res
        .status(UNAUTHORIZED_ERROR)
        .send({ message: "Invalid email address or password." });
    });
};

// Read (GET /user route (getUser renamed to getCurrentUser))

const getCurrentUser = (req, res) => {
  const userId = req.user._id;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res
      .status(BAD_REQUEST_ERROR)
      .send({ message: "Invalid user ID format." });
  }

  return User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(NOT_FOUND_ERROR).send({ message: "User not found." });
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      console.error("Error fetching user:", err);
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "An error occurred on the server." });
    });
};

// Update
const updateProfile = (req, res) => {
  const userId = req.user._id;
  const { name, avatar } = req.body;

  if (!name) {
    return res.status(BAD_REQUEST_ERROR).send({
      message: "Name is a required field.",
    });
  }

  if (!avatar) {
    return res.status(BAD_REQUEST_ERROR).send({
      message: "Avatar is a required field.",
    });
  }

  return User.findByIdAndUpdate(
    userId,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .then((updatedUser) => {
      if (!updatedUser) {
        return res.status(NOT_FOUND_ERROR).send({ message: "User not found." });
      }
      return res.status(200).send(updatedUser);
    })
    .catch((err) => {
      console.error("Error updating user profile:", err);
      if (err.name === "ValidationError") {
        return res
          .status(BAD_REQUEST_ERROR)
          .send({ message: "Invalid data provided for profile update." });
      }
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "An error occurred on the server." });
    });
};

module.exports = { createUser, login, getCurrentUser, updateProfile };
