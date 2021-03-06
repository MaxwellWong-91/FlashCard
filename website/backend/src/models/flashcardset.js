const mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator')
const flashcard = require("./flashcard.js").schema;

const flashcardSetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }, 
  flashcards: { 
    type: [{ 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Flashcard"
    }]
  },
  user: {
      type: String,
      required: true
  }
});

flashcardSetSchema.plugin(uniqueValidator);
const FlashcardSet = mongoose.model("FlashcardSet", flashcardSetSchema);
module.exports = FlashcardSet;