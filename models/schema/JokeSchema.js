
const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose.connection);
const JokeSchema = new Schema({
  jDes: String,
  jLikeNo: Number
});

JokeSchema.plugin(autoIncrement.plugin,{
  model: 'Joke',
  startAt: 0,
});
const Joke = mongoose.model('Joke', JokeSchema);

// Export the model
module.exports = Joke;
