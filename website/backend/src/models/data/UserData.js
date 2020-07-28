var ObjectId = require('mongodb').ObjectID;
const bcrypt = require("bcryptjs");

const pass1 = "hardpass";
const pass2 = "easypass";

const users = [
  {
    _id: ObjectId("579a25921f417dd1e5518141"), 
    username: "coolname", 
    password: "$2a$10$Ej1NkgNHxbsxK85ivtCvfOhCwlxs6R/8WfRcS5uvcNfXF.IBOOXoq",
    sets: [ObjectId("5eae0f84f8159e46bc2028c7")],
    __v: 0
  },
  {
    _id: ObjectId("594d5ef280a846852a4b3f70"),
    username: "awesomename", 
    password: "$2a$10$bz09.u8G84HPoJvrBSwWTOhv/7k9rMQbCafTaSCkknHILs34NAx8C",
    sets: [ObjectId("5ac74cccc65aac3e0c4b6cde")],
    __v: 0
  }
]

module.exports = users;