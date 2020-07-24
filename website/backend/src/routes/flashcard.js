const express = require("express");
const mongoose = require("mongoose");
let FlashcardSet = require("../models/flashcardset");
let Flashcard = require("../models/flashcard");
const auth = require("../middleware/auth");
const User = require("../models/user");
const { set } = require("../../server");

const router = express.Router({mergeParams: true});

/**
 * /api/set/:id/card/create
 */
router.route("/create").post(auth, (req, res) => {
  const { user } = req;
  const {word, definition} = req.body;
  // make sure everything is filled
  if (!word || !definition) {
    return res.status(400).json({ error: "Please make sure all fields are entered"});
  }

  FlashcardSet.findById(req.params.id)
    .then(set => {

      if (!set) {
        return res.status(400).json({error: "FlashcardSet does not exist"})
      }

      User.findById(user.id)
        .then((user) => {
          if (user.username !== set.user) {
            return res.status(403).json({error: `User with id ${user} is not the creator of this set.`});
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
                  return res.json({ flashcard: newFlashcard, msg: "FlashcardSet updated after creation!"})
                })
                .catch(err => res.status(400).json({error: err}));
            })
            .catch(err => res.status(400).json({error: err}));
        })
    })
    .catch(err => res.status(400).json({error: err}));
})

/**
 * /api/set/:id/card/:cardId
 */
router.route("/:cardId").get(auth, (req, res) => {
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
router.route("/update/:cardId").patch(auth, (req, res) => {
  const { user, body, params } = req;
  const {word, definition} = body;
  const { id, cardId } = params;

  if (!word || !definition) {
    return res.status(400).json({ error: "Please make sure all fields are entered"});
  }

  FlashcardSet.findById(id)
    .then((set) => {
      if (!set) {
        return res.status(400).json({error: "FlashcardSet does not exist"})
      }

      User.findById(user.id)
        .then((user) => {
          if (user.username !== set.user) {
            return res.status(403).json({error: `User with id ${user} is not the creator of this set.`});
          }
          Flashcard.findById(cardId)
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
            .catch((err) => res.status(500).json({error: err}));
        })
    })
});


/**
 * /api/set/:id/card/delete/:cardId
 */
router.route("/delete/:cardId").delete(auth, (req, res) => {
  const { user } = req;
  const {id, cardId} = req.params;
  
  FlashcardSet.findById(id)
    .then((set) => {
      if (!set) {
        return res.status(400).json({error: "FlashcardSet does not exist"})
      }
      
      User.findById(user.id)
        .then((user) => {
          if (user.username !== set.user) {
            return res.status(403).json({error: `User with id ${user} is not the creator of this set.`});
          }
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
              .then((_) => {
                return res.json("Flashcard deleted");
              });
            })
          .catch(err => res.status(400).json({error: err}));
          })
    }); 
});


module.exports = router;