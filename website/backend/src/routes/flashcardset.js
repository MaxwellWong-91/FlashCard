const router = require("express").Router();
const mongoose = require("mongoose");

const FlashcardRouter = require("./flashcard");
let FlashcardSet = require("../models/flashcardset");
let Flashcard = require("../models/flashcard");
let User = require('../models/user');
const auth = require("../middleware/auth");

router.use("/:id/card", FlashcardRouter);

// get currently-logged in user's sets
router.route("/").get(auth, (req, res) => {
    const { user } = req;

    User.findById(user.id)
    .populate({
      path: "sets",
      populate: {
        path: "flashcards"
      }  
    })
    .then((user) => {
      if (!user) {
        return res.status(400).json({ error: "User not found." });
      }
      let newSets = [];

      user.sets.forEach((set, idx) => {
        let newFlashcards = {};
        set.flashcards.forEach((card) => {
          newFlashcards[card._id] = card;
        });
        newSets[idx] = { ...set.toObject(), flashcards: newFlashcards };
      })

      return res.json(newSets);
    })
    .catch(err => res.status(500).json({ error: err}));
});

// should get all flashcard sets
// router.route("/all").get((req, res) => {
//   FlashcardSet.find()
//     .then(sets => {
//       if (!sets) {
//         return res.status(400).json({ error: "No sets currently exist." });
//       }
//       return res.json(sets);
//     })
//     .catch(err => res.status(400).json({error: err}));
// })

// should get unique flashcard set names
// This is meant for autofill for search
router.route("/names").get((req, res) => {
  FlashcardSet.distinct('name', (err, names) => {
    if (err) {
      return res.status(500).json({error: err});
    }
    else {
      return res.json(names);
    }
  })
})

// get one flashcard set
router.route("/:id").get((req, res) => {
  FlashcardSet.findById(req.params.id)
    .populate("flashcards")
    .then(set => {
      if (!set) {
        return res.status(400).json({ error: "Flashcard set does not exist" });
      }
      return res.json(set);
    })
    .catch(err => res.status(400).json({error: err}));
})

// handle deleting a flashcard set
router.route("/delete/:id").delete(auth, (req, res) => {
  const { user } = req;
  const { id } = req.params;

  FlashcardSet.findById(id) 
    .then((set) => {
      if (!set) {
        return res.status(400).json({error: `Flashcard set with id ${id} does not exist`});
      }

      // If set exists, delete all flashcards that belong to set AND deletes entry in user that had the flashcard set.
      Promise.all([...set.flashcards.map((flashcardId) => Flashcard.findByIdAndDelete(flashcardId).exec()),
        User.findOneAndUpdate({_id: mongoose.Types.ObjectId(user.id)}, {
          $pull: {sets: mongoose.Types.ObjectId(id)}
          }, 
            (err) => {
              if (err) {
                return res.status(500).json({error: err});
              }
            }
          )])
        .then((_) => FlashcardSet.findByIdAndDelete(req.params.id))
        .then((_) => res.json({msg: "Flashcard Set deleted"}))
        .catch(err => res.status(400).json({error: err}));
    })
    .catch((err) => res.status(500).json({error: err}));

  
})

// handle creating a flashcard set
router.route("/create").post(auth, (req, res) => {
  const { user } = req;
  const { name, flashcards } = req.body;

  console.log(req);
  // check for name
  if (!name) {
    return res.status(400).json({ error: "Please enter a name for the flashcard set" });
  }
  User.findById(user.id)
    .then((user) => {
      if (!user) {
        return res.status(400).json({ error: "User not found." });
      }
      else {
        let flashcardIds = [];
        let flashcardDocs = [];
        if (flashcards) {
          flashcardDocs = flashcards.map((flashcard) => new Flashcard(flashcard));
          flashcardIds = flashcardDocs.map((flashcard) => flashcard._id);
        }

        Promise.all(flashcardDocs.map((flashcard) => flashcard.save()))
          .then((_) => {
            const newSet = new FlashcardSet({
              name,
              flashcards: flashcardIds,
              user: user.username
            });
    
            user.sets.push(mongoose.Types.ObjectId(newSet._id));
    
            Promise.all([user.save(), newSet.save()])
              .then((_) => res.json(newSet))
              .catch((err) => res.status(500).json({ error: err }));
          });
      }
    })
    .catch((err) => res.status(500).json({ error: err }));

  
})

// Handle updating a flashcard set
router.route("/update/:id").patch((req, res) => {
  const { name } = req.body;
  const { id } = req.params;
  
  if (!name) {
    return res.status(400).json({error: "Please enter a name for the flashcard set"});
  }

  FlashcardSet.findById(id)
  .then((card) => {
    if (!card) {
      return res.status(400).json({ error: `Flashcard set with id ${id} does not exist` });
    }

    card.name = name;
    card.save()
    .then((_) => {
      res.json(card);
    })
    .catch((err) => res.status(500).json({error: err}));
  })
  .catch((err) => res.status(500).json({error: err}));
});

// Handle searching for a flashcard set by name
router.route("/search").post((req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({error: "Please enter a name to search!"});
  }

  FlashcardSet.find({ name })
  .then((data) => {
    if (!data.length) {
      return res.status(400).json({error: `Flashcard set with name ${name} does not exist`})
    }

    return res.json(data);
  })
  .catch((err) => res.status(500).json({error: err}));
});

module.exports = router;