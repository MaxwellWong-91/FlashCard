var ObjectId = require('mongodb').ObjectID;

const flashcardSets = [
  {
    _id: ObjectId("5eae0f84f8159e46bc2028c7"), 
    name: "Biology",
    user: ObjectId("579a25921f417dd1e5518141"),
    __v: 0
  },
  {
    _id: ObjectId("5ac74cccc65aac3e0c4b6cde"),
    flashcards: [ObjectId("507f1f77bcf86cd799439011"), ObjectId("507f191e810c19729de860ea")],
    name: "cse100",
    user: ObjectId("594d5ef280a846852a4b3f70"),
    __v: 0
  }
]

module.exports = flashcardSets;