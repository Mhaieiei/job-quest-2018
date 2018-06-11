
const Joke = require('../models/schema/JokeSchema');

module.exports = {
  getAllJokes: (req, res) => {
    Joke.find({})
    .then(jokes => res.send(jokes))
    .catch(err => res.send(err))
  },

  addNewJoke: (req, res) => {
    const jokeObject = req.body.jokeObject;
    Joke.create(jokeObject)
    .then(data =>res.send('Create joke success'))
    .catch(err => res.send(err))
  },

  getJokeByID: (req, res) => {
    const id = req.params.id;
    Joke.findById(id)
    .then(jokes => res.send(jokes))
    .catch(err => res.send(err))
  },

  deleteJokeByID: (req, res) => {
    const id = req.params.id;
    Joke.findByIdAndRemove(id)
    .then(jokes => res.send('delete silly joke success'))
    .catch(err => res.send(err));
  },

  likeJoke: (req, res) => {
    const id = req.params.id;
    const updateStatus = {jStatus: true};
    Joke.findByIdAndUpdate(id, updateStatus)
    .then(() => res.send('this joke is so fun, I like it'))
    .catch((err) => res.send(err));
  },

  dislikeJoke: (req, res) => {
    //res.send('dislike joke');
    const id = req.params.id;
    const updateStatus = {jStatus: false};
    Joke.findByIdAndUpdate(id, updateStatus)
    .then(() => res.send('this joke is so ..., I dont like it'))
    .catch((err) => res.send(err));
  },
  
  resetId: (req, res) => {
    var joke = new Joke();
      joke.resetCount((err,nextcount)=>{
        res.send(`reset success next count ${nextcount}`);
      });
  }
};