const express = require("express");
const mongoose = require("mongoose");
let FlashcardSet = require("../models/flashcardset");
let Flashcard = require("../models/flashcard");
const auth = require("../middleware/auth");

const router = express.Router({mergeParams: true});

/**
 * /api/set/:id/card/create
 */
router.route("/create").post((req, res) => {
  const {word, definition} = req.body;;
  // make sure everything is filled
  if (!word || !definition) {
    return res.status(400).json({ error: "Please make sure all fields are entered"});
  }

  FlashcardSet.findById(req.params.id)
    .then(set => {

      if (!set) {
        return res.status(400).json({error: "FlashcardSet does not exist"})
      }

      const newFlashcard = new Flashcard({
        word, definition
      })
      newFlashcard.save()
        .then(() => {
          set.flashcards.push(newFlashcard);
          set.markModified("flashcards");
          set.save()
            .then(() => {
              return res.json({ set, msg: "FlashcardSet updated after creation!"})
            })
            .catch(err => res.status(400).json({error: err}));
        })
        .catch(err => res.status(400).json({error: err}));
    })
    .catch(err => res.status(400).json({error: err}));
})

/**
 * /api/set/:id/card/:cardId
 */
router.route("/:cardId").get((req, res) => {
  /**
   * This gives you the parent of it
   */
  /*
  FlashcardSet.find({flashcards: mongoose.Types.ObjectId(req.params.cardId)})
    .then((set) => res.json(set))
    .catch(err => res.status(400).json('Error: ' + err));
  */
 
  Flashcard.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        return res.status(400).json({ error: "Flashcard does not exist" });
      }
      return res.json(card);
    })
    .catch(err => res.status(400).json({error: err}));
})


/**
 * /api/set/:id/card/update/:cardId
 */
router.route("/update/:cardId").patch((req, res) => {
  const {word, definition} = req.body;

  if (!word || !definition) {
    return res.status(400).json({ error: "Please make sure all fields are entered"});
  }

  Flashcard.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        return res.status(400).json({ error: "Flashcard does not exist" });
      }

      card.word = word;
      card.definition = definition;

      card.save()
        .then(() => {
          return res.json({card, msg: "Flashcard successfully updated!"})
        })
        .catch(err => res.status(400).json({error: err}));
    })
    .catch(err => res.status(400).json({error: err}));
})


/**
 * /api/set/:id/card/delete/:cardId
 */
router.route("/delete/:cardId").delete(auth, (req, res) => {
  const {id, cardId} = req.params;
  
  Flashcard.findByIdAndDelete(cardId)
    .then(() => {
      FlashcardSet.findOneAndUpdate({_id: mongoose.Types.ObjectId(id)}, {
        $pull: {flashcards: mongoose.Types.ObjectId(cardId)}
        }, 
          (err) => {
            if (err) {
              return (res.status(400).json({error: err}));
            }
          }
        )
      })
    .catch(err => res.status(400).json({error: err}));
  
  return res.json("Flashcard deleted");
});


module.exports = router;