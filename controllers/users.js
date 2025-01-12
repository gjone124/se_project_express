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

// Create Method #1 (POST /signup route)
const createUser = (request, response) => {
  const { name, avatar, email, password } = request.body;

  if (!name) {
    return response
      .status(BAD_REQUEST_ERROR)
      .send({ message: "Name is a required field." });
  }

  // (comment out if no avatar provided)
  // if (!avatar) {
  //   return response
  //     .status(BAD_REQUEST_ERROR)
  //     .send({ message: "Avatar is a required field." });
  // }

  if (!email) {
    return response
      .status(BAD_REQUEST_ERROR)
      .send({ message: "Email address is a required field." });
  }

  if (!password) {
    return response
      .status(BAD_REQUEST_ERROR)
      .send({ message: "Password is a required field." });
  }

  return User.findOne({ email })
    .then((existingUser) => {
      if (existingUser) {
        return response.status(CONFLICT_ERROR).send({
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
          return response.status(201).send(userResponse);
        })
        .catch((err) => {
          console.error("Error creating user:", err);
          if (err.name === "ValidationError") {
            return response
              .status(BAD_REQUEST_ERROR)
              .send({ message: "Invalid data provided for user creation." });
          }

          return response
            .status(INTERNAL_SERVER_ERROR)
            .send({ message: "An error occurred on the server." });
        });
    })
    .catch(() =>
      response
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "An error occurred on the server." })
    );
};

// Create Method #2 (POST /signin route)
const login = (request, response) => {
  const { email, password } = request.body;

  if (!email) {
    return response
      .status(BAD_REQUEST_ERROR)
      .send({ message: "Email address is required." });
  }

  if (!password) {
    return response
      .status(BAD_REQUEST_ERROR)
      .send({ message: "Password is required." });
  }

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });

      return response.status(200).send({ token });
    })
    .catch((err) => {
      console.error("Login error:", err.message);
      if (err.message === "Invalid email address or password.") {
        response
          .status(UNAUTHORIZED_ERROR)
          .send({ message: "Invalid email address or password." });
      } else {
        response
          .status(INTERNAL_SERVER_ERROR)
          .send({ message: "An error occurred on the server." });
      }
    });
};

// Read (GET /users/me route (getUser renamed to getCurrentUser and route modified from "/:userId" to "/me"))
const getCurrentUser = (request, response) => {
  const userId = request.user._id;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return response
      .status(BAD_REQUEST_ERROR)
      .send({ message: "Invalid user ID format." });
  }

  return User.findById(userId)
    .then((user) => {
      if (!user) {
        return response
          .status(NOT_FOUND_ERROR)
          .send({ message: "User not found." });
      }
      return response.status(200).send(user);
    })
    .catch((err) => {
      console.error("Error fetching user:", err);
      return response
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "An error occurred on the server." });
    });
};

// Update (PATCH /users/me route)
const updateProfile = (request, response) => {
  const userId = request.user._id;
  const { name, avatar } = request.body;

  if (!name) {
    return response.status(BAD_REQUEST_ERROR).send({
      message: "Name is a required field.",
    });
  }

  if (!avatar) {
    return response.status(BAD_REQUEST_ERROR).send({
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
        return response
          .status(NOT_FOUND_ERROR)
          .send({ message: "User not found." });
      }
      return response.status(200).send(updatedUser);
    })
    .catch((err) => {
      console.error("Error updating user profile:", err);
      if (err.name === "ValidationError") {
        return response
          .status(BAD_REQUEST_ERROR)
          .send({ message: "Invalid data provided for profile update." });
      }
      return response
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "An error occurred on the server." });
    });
};

module.exports = { createUser, login, getCurrentUser, updateProfile };
