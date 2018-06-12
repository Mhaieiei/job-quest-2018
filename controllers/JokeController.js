
const Joke = require('../models/schema/JokeSchema');
const UserJoke = require('../models/schema/UserJokeSchema');
const jwt = require('jsonwebtoken');

module.exports = {
  getAllJokes: (req, res) => {
    Joke.find({})
      .then(jokes => res.send(jokes))
      .catch(err => res.send(err));
  },

  addNewJoke: (req, res) => {
    Joke.create(req.body.jokeObject)
      .then(() => res.send('Create joke success'))
      .catch(err => res.send(err));
  },

  getJokeByID: (req, res) => {
    Joke.findById(req.params.id)
      .then(jokes => {
        if(jokes) res.send(jokes)
        res.send('this joke is not exist');
      })
      .catch(err => res.send(err));
  },

  deleteJokeByID: (req, res) => {
    Joke.findByIdAndRemove(req.params.id)
      .then(() => res.send('delete silly joke success'))
      .catch(err => res.send(err));
  },

  likeJoke: (req, res) => {
    const jokeid = req.params.id;
    if (req.headers.authorization === undefined) {
      res.send('To like this joke, you have to login first');
    } else {
      const token = req.headers.authorization.split(' ')[1];
      // verify user
      jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) return res.send(err);
        UserJoke.findOne({ uID: decoded.id })
          .then((result) => {
            if (result === null) {
            // create new record
              const userjoke = new UserJoke();
              userjoke.uID = decoded.id;
              userjoke.jokeId = jokeid;
              userjoke.jokeStatus = true;
              userjoke.save()
                .then(() => res.send('this joke is so fun, I like it'))
                .catch(err1 => res.send(err1));
            //= ===== Update Number Like =========
            } else {
            // check status joke is like(true) or not
              if (result.jokeStatus) {
                return res.send('this joke has already liked, dont spam!!');
              }
              // update joke status
              result.jokeStatus = true;
              result.save()
                .then(() => res.send('I change my mind, this joke is so fun'))
                .catch(err2 => res.send(err2));
              //= ===== Update Number Like =========
            }
          })
          .catch(err3 => res.send(err3));
      });
    }
  },

  dislikeJoke: (req, res) => {
    // res.send('dislike joke');
    const jokeid = req.params.id;
    if (req.headers.authorization === undefined) {
      res.send('To unlike this joke, you have to login first');
    } else {
      const token = req.headers.authorization.split(' ')[1];
      // verify user
      jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) return res.send(err);
        UserJoke.findOne({ uID: decoded.id })
          .then((result) => {
            if (result === null) {
            // create new record
              const userjoke = new UserJoke();
              userjoke.uID = decoded.id;
              userjoke.jokeId = jokeid;
              userjoke.jokeStatus = false;
              userjoke.save()
                .then(() => res.send('this joke is so ..., I dont like it'))
                .catch(err1 => res.send(err1));
            //= ===== Update Number Like =========
            } else {
            // check status joke is like(true) or not
              if (!result.jokeStatus) {
                return res.send('this joke has already unliked, dont spam!!');
              }
              // update joke status
              result.jokeStatus = false;
              result.save()
                .then(() => res.send('I change my mind, this joke is not fun'))
                .catch(err2 => res.send(err2));
              //= ===== Update Number Like =========
            }
          })
          .catch(err3 => res.send(err3));
      });
    }
  },

};
