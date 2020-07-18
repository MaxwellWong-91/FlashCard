const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
const auth = require("../middleware/auth")

require('dotenv').config();

let User = require("../models/user");

// handle finding getting all users
router.route("/").get(auth, (req, res) => {
  User.find()
    .select("-password")
    .then(users => res.json(users))
    .catch(err => res.status(400).json({error: err}));
});

// handle getting user by jwt token
router.route("/get").get(auth, (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then(user => res.json(user))
    .catch(err => res.status(400).json({error: err}));
});

// handle registration
router.route("/register").post((req, res) => {
  const {username, password1, password2} = req.body;

  // make sure all fields are entered
  if (!username || !password1 || !password2) {
    return res.status(400).json({ error: "Please make sure all fields are entered" });
  }

  // make sure passwords match
  if (password1 !== password2) {
    return res.status(400).json({ error: "Please make sure passwords are the same" });
  }

  // check if we can find existing username
  User.findOne({ username })
    .then(user => {
      if (user) {
        return res.status(400).json({ error: "Username already taken" });
      }

      // create user
      const newUser = new User({
        username,
        password : password1
      })

      // hash the password
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) {
            throw err;
          }

          // update user to have a hashed password
          newUser.password = hash;
          newUser.save()
            .then(user => {
              // send jwt token
              jwt.sign({ id: user.id }, process.env.JWT_SECRET,{ expiresIn: 3600}, 
                (err, token) => {
                  if (err) {
                    throw err;
                  }
                  res.json({
                    token,
                    user: {
                      id: user.id,
                      username: user.username
                    }
                  })
                }
              )
            })
          })
        })
      })
      .catch(err => res.status(400).json({error: err}));
  
})

// handle login
router.route("/login").post((req, res) => {
  const {username, password} = req.body;

  // make sure all fields are entered
  if (!username || !password) {
    return res.status(400).json({ error: "Please make sure all fields are entered" });
  }

  // check if we can find a user with the username
  User.findOne({ username })
    .then(user => {
      if (!user) {
        return res.status(400).json({ error: "Invalid Credentials" });
      }

      // decrypt the password and check if match
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (!isMatch) {
            return res.status(400).json({ error: "Invalid Credentials" });
          }

          // send jwt
          jwt.sign(
            { id: user.id }, 
            process.env.JWT_SECRET,
            { expiresIn: 3600 }, 
            (err, token) => {
              if (err) {
                throw err;
              }
              
              res.json({
                token,
                user: {
                  id: user.id,
                  username: user.username
                }
              })
            }
          )
        

        })
    })
    .catch(err => res.status(400).json({error: err}));
})


module.exports = router