const router = require("express").Router();
const FlashcardRouter = require("./flashcard");
let FlashcardSet = require("../models/flashcardset");

router.use("/:id/card", FlashcardRouter);

// should get all flashcard sets
router.route("/").get((req, res) => {
  FlashcardSet.find()
    .then(sets => res.json(sets))
    .catch(err => res.status(400).json({error: err}));
})

// get one flashcard set
router.route("/:id").get((req, res) => {
  FlashcardSet.findById(req.params.id)
    .then(set => res.json(set))
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
    return res.status(400).json({ error: "Please enter a name for the flashcard" });
  }
  console.log(name);

  // check if name used already
  FlashcardSet.findOne({ name })
    .then(data => {
      if (data) {
        console.log("hi");
        return res.status(400).json({ msg: "Flashcard set with that name already exists" });
      }
    })
    .catch(err => res.status(400).json({error: err}));

  const newSet = new FlashcardSet({
    name
  })

  newSet.save()
    .then(() => res.json(newSet))
    .catch(err => res.status(400).json({error: err}));
})

module.exports = router;