const express = require('express');
const app = express();
const port = 8080;
const bodyParser = require("body-parser");

// connect database
require('./src/database');

app.get('/', (req, res) => {
    res.send("Hello World ! ");
});

const userRouter = require("./src/routes/user");
const flashcardsetRouter = require("./src/routes/flashcardset");
const processRouter = require("./src/routes/process");

app.use(express.json({limit: "50mb"}));
app.use(express.urlencoded({extended: true}));
app.use("/api/user", userRouter);
app.use("/api/set", flashcardsetRouter);
app.use("/api/process", processRouter);

app.listen(port, function () {
    console.log(`Server Listening on ${port}`);
});

console.log("hello world");