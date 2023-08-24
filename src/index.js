const express = require("express");
const bodyParser = require("body-parser");
const adminRouter = require("./routes/adminRoutes");

const cors = require("cors");
require("dotenv").config();

// Setup server port
const port = process.env.PORT || 3000;
// create express app
const app = express();
app.use(
  cors({
    origin: "http://localhost:4200",
  })
);

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());
app.use("/admin", adminRouter);

// define a root route
app.get("/", (req, res) => {
  res.send("Hello World");
});

// listen for requests
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
