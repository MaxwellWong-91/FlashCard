const mongoose = require('mongoose');
const dotenv = require('dotenv');
require('dotenv').config();

// mongodb options 
const options = {
  useNewUrlParser: true,        // set to true unless doesn't work
  useFindAndModify: false,      // findOneAndUpdate() and findOneAndRemove() -> 
                                // findOneAndUpdate() instead findAndModify()
  useCreateIndex: true,         
  useUnifiedTopology: true,    // set true unless doesn't work
  poolSize: 10,                // maintain 10 sockets
  bufferMaxEntries: 0          // fails if databse isn't connected
}

//var MongoClient = require('mongodb').MongoClient;

module.exports = function initializeDB(callback) {
  if (process.env.NODE_ENV === 'test') {
    mongoose.connect(process.env.TEST_URI, options)
      .then(() => {
        
        console.log("Test MongoDB connected");
        callback()
      })
      .catch(err => console.log(err));

  } else {
    mongoose.connect(process.env.URI, options)
      .then(() => {
        console.log("MongoDB connected");
        callback()
      })
      .catch(err => console.log(err));
  }
}

