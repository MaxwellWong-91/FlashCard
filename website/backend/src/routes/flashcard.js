const express = require("express");
let FlashcardSet = require("../models/flashcardset");
let Flashcard = require("../models/flashcard");

const router = express.Router({mergeParams: true});

// get one card from set
router.route("/:cardId").get((req, res) => {
  FlashcardSet.findById(req.params.id)
    .then(set => {
      if (!set) {
        return res.status(400).json({ msg: "Flashcard Set does not exist" });
      }

      console.log(set.flashcards);
      res.json(set);
    })
})

router.route("/create").post((req, res) => {
  const {word, definition} = req.body;

  // make sure everything is filled
  if (!word || !definition) {
    return res.status(400).json({ msg: "Please make sure all fields are entered" });
  }

  const newFlashcard = new Flashcard({
    word, definition
  })

  Flashcard.save();

  FlashcardSet.findById(req.params.id)
    .


})

module.exports = router;