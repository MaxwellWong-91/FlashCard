const mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator')
// const flashcardSet = require('./flashcardset').schema;

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  }, 
  password: {
    type: String,
    required: true
  },
  sets: {
    type: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "FlashcardSet"
    }]
  }
});

userSchema.plugin(uniqueValidator)
const User = mongoose.model("User", userSchema);
module.exports = User;