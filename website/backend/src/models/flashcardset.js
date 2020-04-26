const mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator')

const flashcardSetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }, 
  
});

flashcardSetSchema.plugin(uniqueValidator);
const FlashcardSet = mongoose.model("User", flashcardSetSchema);
module.exports = FlashcardSet;