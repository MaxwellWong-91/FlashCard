const mongoose = require("mongoose");

var flashcardSchema = new mongoose.Schema({
  word: {
    type: String,
    required: true,
    //unique: true
  },

  definition: {
    type: String,
    required: true,
  }
})

flashcardSchema.pre("remove", function(next) {
  this.model("FlashcardSet").remove({flashcards: this._id}, next);
})

const flashcard = mongoose.model("Flashcard", flashcardSchema);
module.exports = flashcard;