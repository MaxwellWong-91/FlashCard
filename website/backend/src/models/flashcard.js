const mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');

const flashcardSchema = new mongoose.Schema({
  word: {
    type: String,
    required: true,
    unique: true
  },

  definition: {
    type: String,
    required: true,
  }
})

flashcardSchema.plugin(uniqueValidator);
const flashcard = mongoose.model("Flashcard", flashcardSchema);
module.exports = flashcard;