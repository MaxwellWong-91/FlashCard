const router = require("express").Router();
let User = require("../models/user");

// handle finding getting all users
router.route("/").get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

// handle getting one user
router.route("/get").get((req, res) => {
  User.find({username: req.body.username})
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
});

// handle create new user
router.route("/register").post((req, res) => {
  const username = req.body.username;

  const password = req.body.password;

  const newUser = new User({username, password});

  newUser.save()
    .then(() => res.json("User Added!"))
    .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router