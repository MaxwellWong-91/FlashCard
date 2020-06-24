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

// set up environ variables
const {
  MONGO_HOSTNAME,
  MONGO_DB,
  MONGO_PORT
} = process.env;

//var MongoClient = require('mongodb').MongoClient;

const dbConnectionURL = {
  //'LOCALURL': `mongodb://${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}`
  'LOCALURL': process.env.URI
};

module.exports = function initializeDB(callback) {
  if (process.env.NODE_ENV === 'test') {
    const Mockgoose = require('mockgoose').Mockgoose;
    const mockgoose = new Mockgoose(mongoose);

    mockgoose.prepareStorage()
      .then(() => {
        mongoose.connect(dbConnectionURL.LOCALURL, options)
          .then(() => {
            console.log("Mock MongoDB connected");
            callback()
          })
          .catch(err => console.log(err));

      })

  } else {
    mongoose.connect(dbConnectionURL.LOCALURL, options)
      .then(() => {
        console.log("MongoDB connected");
        callback()
      })
      .catch(err => console.log(err));
  }
}

