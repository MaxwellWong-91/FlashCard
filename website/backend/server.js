const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8080;

// connect database
require('./src/database');

app.get('/', (req, res) => {
    res.send("Hello World ! ");
});

const userRouter = require('./src/routes/user');
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(bodyParser.json());
app.use('/api/user', userRouter);

app.listen(port, function () {
    console.log(`Server Listening on ${port}`);
});

console.log("hello world");