const router = require("express").Router();
const FlashcardRouter = require("./flashcard");
let FlashcardSet = require("../models/flashcardset");

router.use("/:id/card", FlashcardRouter);

// should get all flashcard sets
router.route("/").get((req, res) => {
  FlashcardSet.find()
    .then(sets => {
      if (!sets) {
        return res.status(400).json({ error: "No sets currently exist." });
      }
      return res.json(sets);
    })
    .catch(err => res.status(400).json({error: err}));
})

// get one flashcard set
router.route("/:id").get((req, res) => {
  FlashcardSet.findById(req.params.id)
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
  FlashcardSet.findByIdAndDelete(req.params.id)
    .then(() => res.json({msg: "Flashcard Set deleted"}))
    .catch(err => res.status(400).json({error: err}));
})

// handle creating a flashcard set
router.route("/create").post((req, res) => {
  const { name } = req.body;

  // check for name
  if (!name) {
    return res.status(400).json({ error: "Please enter a name for the flashcard set" });
  }

  // check if name used already (update: not used anymore b/c allow duplicates)
//   FlashcardSet.findOne({ name })
//     .then(data => {
//       if (data) {
//         return res.status(400).json({ error: "Flashcard set with that name already exists" });
//       }
//     })
//     .catch(err => res.status(400).json({error: err}));

  const newSet = new FlashcardSet({
    name
  })

  newSet.save()
    .then(() => res.json(newSet))
    .catch(err => res.status(400).json({error: err}));
})

// Handle updating a flashcard set
router.route("/update/:id").put((req, res) => {
    const { name } = req.body;
    const { id } = req.params;

    if (!name) {
        return res.status(400).json({error: "Please enter a name for the flashcard set"});
    }

    FlashcardSet.findById(id)
    .then((card) => {
        if (!card) {
            return res.status(400).json({ error: `Flashcard set with ${id} does not exist` });
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

module.exports = router;