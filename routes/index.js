const router = require("express").Router();

const userRouter = require("./users");
const itemRouter = require("./clothingItems");
const { createUser, login } = require("../controllers/users");
const { NOT_FOUND_ERROR } = require("../utils/errors");

// CRUD (Create, Read, Update, Delete)

// Create
router.post("/signup", createUser);
router.post("/signin", login);

// Read
router.use("/users", userRouter);
router.use("/items", itemRouter);

router.use((req, res) => {
  res.status(NOT_FOUND_ERROR).send({ message: "Router not found." });
});

module.exports = router;
