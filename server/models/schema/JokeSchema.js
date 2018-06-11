
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const JokeSchema = new Schema({
  jID: String,
  jDes: String,
  jStatus: String,
});

const jokeSchema = mongoose.model('joke', JokeSchema);

// Export the model
export default jokeSchema;
