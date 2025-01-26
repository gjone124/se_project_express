const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config(); // Sprint 15

const { errors } = require("celebrate");
const mainRouter = require("./routes/index.js");
const errorHandler = require("./middlewares/error-handler.js");
const { requestLogger, errorLogger } = require("./middlewares/logger.js");

const app = express();
const { PORT = 3001 } = process.env;

// recommended by Terminal to get rid of warning ("DeprecationWarning: The `punycode` module is deprecated" warning gets ignored in Terminal)
mongoose.set("strictQuery", true);

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to Database");
  })
  .catch(console.error);

app.use(express.json());
app.use(cors());

// enable request logger using Winston (Sprint 15)
app.use(requestLogger);
app.use("/", mainRouter);

// enable error logger using Winston (Sprint 15)
app.use(errorLogger);

// celebrate error handler (Sprint 15)
app.use(errors());

// centralized error handler (Sprint 15)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
