const router = require("express").Router();

const userRouter = require("./users");
const itemRouter = require("./clothingItems");
const { createUser, login } = require("../controllers/users");
const { NOT_FOUND_ERROR } = require("../utils/errors");

// CRUD (Create, Read, Update, Delete)

// Create Method #1 (POST /signup route)
router.post("/signup", createUser);

// Create Method #2 (POST /signin route)
router.post("/signin", login);

router.use("/users", userRouter);
router.use("/items", itemRouter);

router.use((req, res) => {
  res.status(NOT_FOUND_ERROR).send({ message: "Router not found." });
});

module.exports = router;
