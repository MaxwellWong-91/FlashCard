const mongoose = require("mongoose");
let FlashcardSet = require("./flashcardset");
let Flashcard = require("./flashcard");

const flashcards = require("./data/flashcard_data");

module.exports = function seedData() {
  Flashcard.insertMany(flashcards)
    .then(() => {
      console.log("Flashcard Data inserted");
    })
    .catch((err) => {
      console.log(err);
    })
};
