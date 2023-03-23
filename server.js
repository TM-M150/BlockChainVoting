const next = require("next");
const express = require("express");
const voter = require("./routes/voter");
const company = require("./routes/company");
const candidate = require("./routes/candidate");
const bodyParser = require("body-parser");
const connectDB = require("./config/database");
const exp = express();
const path = require("path");

dotenv.config({ path: "./config/config.env" });

connectDB();

exp.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
exp.use(bodyParser.json());
exp.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/pages/homepage.js"));
});

exp.use("/company", company);

exp.use("/voter", voter);

exp.use("/candidate", candidate);

const app = next({
  dev: process.env.NODE_ENV !== "production",
});

const routes = require("./routes");
const handler = routes.getRequestHandler(app);

app.prepare().then(() => {
  exp.use(handler).listen(3600, function () {
    console.log(
      `Server running in ${process.env.NODE_ENV} mode, on port ${PORT}`
    );
  });
});
