const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const axios = require("axios");
const webimRouter = require("./routes/api/webim");
axios.defaults.headers["Cookie"] = process.env.WEBIM_COOKIE;

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/webim", webimRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
