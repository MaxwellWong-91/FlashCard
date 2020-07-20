const router = require("express").Router();
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
    .populate("sets")
    .then((user) => {
      if (!user) {
        return res.status(400).json({ error: "User not found." });
      }

      return res.json(user.sets);
    })
    .catch(err => res.status(500).json({ error: err}));
});

// should get all flashcard sets
router.route("/all").get((req, res) => {
  FlashcardSet.find()
    .then(sets => {
      if (!sets) {
        return res.status(400).json({ error: "No sets currently exist." });
      }
      return res.json(sets);
    })
    .catch(err => res.status(400).json({error: err}));
})

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
router.route("/delete/:id").delete((req, res) => {
  const { id } = req.params;

  FlashcardSet.findById(id) 
    .then((set) => {
      if (!set) {
        return res.status(400).json({error: `Flashcard set with id ${id} does not exist`});
      }

      // If set exists, delete all flashcards that belong to set.
      Promise.all(set.flashcards.map((flashcardId) => Flashcard.findByIdAndDelete(flashcardId).exec()))
        .then((_) => FlashcardSet.findByIdAndDelete(req.params.id))
        .then((_) => res.json({msg: "Flashcard Set deleted"}))
        .catch(err => res.status(400).json({error: err}));
    })
    .catch((err) => res.status(500).json({error: err}));

  
})

// handle creating a flashcard set
router.route("/create").post(auth, (req, res) => {
  const { user } = req;
  const { name } = req.body;

  // check for name
  if (!name) {
    return res.status(400).json({ error: "Please enter a name for the flashcard set" });
  }

  // Get username before creating set
  User.findById(user.id)
    .then((user) => {
      if (!user) {
        return res.status(400).json({ error: "User not found." });
      }
      else {
        const newSet = new FlashcardSet({
          name,
          user: user.username
        })
      
        newSet.save()
          .then(() => res.json(newSet))
          .catch(err => res.status(400).json({error: err}));
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