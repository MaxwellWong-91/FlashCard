var ObjectId = require('mongodb').ObjectID;

const flashcards = [
  {
    _id: ObjectId("507f1f77bcf86cd799439011"), 
    word: "agile", 
    definition: "software methodology",
    __v: 0
  },
  {
    _id: ObjectId("507f191e810c19729de860ea"), 
    word: "waterfall", 
    definition: "ancient software methodology",
    __v: 0
  }
]

module.exports = flashcards;