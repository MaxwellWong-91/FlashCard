const mongoose = require("mongoose");
let FlashcardSet = require("./flashcardset");
let Flashcard = require("./flashcard");
let User = require("./user");
const users = require("./data/UserData");
const flashcards = require("./data/FlashcardData");
const flashcardSet = require("./data/FlashcardSetData");

module.exports = function seedData(callback) {
  // clear all data first
  clearData();

  Flashcard.insertMany(flashcards)
    .then(() => {
      console.log("Flashcard Data inserted");
      FlashcardSet.insertMany(flashcardSet)
        .then(() => {
          console.log("FlashcardSet Data inserted");
          User.insertMany(users)
            .then(() => {
              console.log("User Data inserted");
              callback();
            })
            .catch((err) => {
              console.log(err);
            })
        })
        .catch((err) => {
          console.log(err);
        })
    })
    .catch((err) => {
      console.log(err);
    })

  /*  
  result
    .then(() => {
      console.log("am i bcalled?");
      Flashcard.insertMany(flashcards)
        .then(() => {
          console.log("Flashcard Data inserted");
        })
        .catch((err) => {
          console.log(err);
        })
    })
    .catch((err) => {
      console.log(err);
    })
  */
};

function clearData() {
  Flashcard.deleteMany({})
    .then(() => {
      console.log("Flashcard Deleted");
    })
  FlashcardSet.deleteMany({})
    .then(() => {
      console.log("Flashcard Set Deleted");
    })
  User.deleteMany({})
    .then(() => {
      console.log("User Deleted");
    })
}

/*
function clearData() {
  return new Promise ((resolve) => {
    Flashcard.deleteMany({})
      .then(() => {
        console.log("Flashcard Deleted");
      })
    FlashcardSet.deleteMany({})
      .then(() => {
        console.log("Flashcard Set Deleted");
      })
    User.deleteMany({})
      .then(() => {
        console.log("User Deleted");
      })
  })
}
*/