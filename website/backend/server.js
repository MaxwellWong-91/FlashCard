const express = require('express');
var cors = require("cors");
const app = express();
const port = process.env.PORT || 8080;

// connect database
const initializeDB = require("./src/database");

app.get('/', (req, res) => {
    res.send("Hello World ! ");
});

const userRouter = require("./src/routes/user");
const flashcardsetRouter = require("./src/routes/flashcardset");
const processRouter = require("./src/routes/process");

app.use(cors());

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(express.json({limit: "50mb"}));
app.use(express.urlencoded({extended: true}));
app.use("/api/user", userRouter);
app.use("/api/set", flashcardsetRouter);
app.use("/api/process", processRouter);

initializeDB(function () {
  app.listen(port, function () {
    console.log(`Server Listening on ${port}`);
    app.emit("ready");
  });
});

module.exports = app;