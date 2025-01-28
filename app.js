const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config(); // Sprint 15

const { errors } = require("celebrate"); // Sprint 15
const helmet = require("helmet"); // Sprint 15
const rateLimiter = require("./middlewares/rateLimiter"); // Sprint 15
const mainRouter = require("./routes/index");
const errorHandler = require("./middlewares/error-handler"); // Sprint 15
const { requestLogger, errorLogger } = require("./middlewares/logger"); // Sprint 15

const app = express();
const { PORT = 3001 } = process.env;

// recommended by Terminal to get rid of warning ("DeprecationWarning: The `punycode` module is deprecated" warning gets ignored in Terminal)
mongoose.set("strictQuery", true);

// connect to mongoose database (Mongo DB)
mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to Database");
  })
  .catch(console.error);

// implements Helmet middleware to set security headers for API to protect against security vulnerabilities
app.use(helmet());

// apply rate limiting to all requests (maximum 100 requests every 15 minutes)
app.use(rateLimiter);

// parses incoming JSON payloads from HTTP requests & makes data available to request body
app.use(express.json());

// allows / restricts web applications from making requests to domains other than their own
app.use(cors());

// enable request logger using Winston (Sprint 15)
app.use(requestLogger);

// crash test (for reviewer purposes; should remove after review is passed)
app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});

// route to run application
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
