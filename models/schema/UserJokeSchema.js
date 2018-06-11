const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const UserJokeSchema = new Schema({
  uID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  jokeID: { type: mongoose.Schema.Types.ObjectId, ref: 'Joke' },
  jokeStatus: Boolean
});

// Create the model class
const UserJoke = mongoose.model('userjoke', UserJokeSchema);

module.exports = UserJoke;
