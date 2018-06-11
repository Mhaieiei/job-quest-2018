
const Joke = require('../models/schema/JokeSchema');
const UserJoke = require('../models/schema/UserJokeSchema');
const jwt = require('jsonwebtoken');

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
    const jokeid = req.params.id;
    const updateStatus = {jStatus: true};
    const token = req.headers.authorization.split(' ')[1];
    //console.log('token', token);

    //verify user
    jwt.verify(token, 'uiop890abc', (err, decoded) => {
      if(err) return res.send(err)
      UserJoke.findOne({uID: decoded.id})
      .then(result => {
        if(result === null){
          //create new record
          const userjoke = new UserJoke();
            userjoke.uID = decoded.id;
            userjoke.jokeId = jokeid;
            userjoke.jokeStatus = true;
          userjoke.save()
            .then(result => res.send('this joke is so fun, I like it'))
            .catch(err => res.send(err));
          //====== Update Number Like =========
        }else{
          //check status joke is like(true) or not
          if(result.jokeStatus){
            return res.send('this joke has already like by you, dont spam!!')
          }else{
            //update joke status
            result.jokeStatus = true;
            result.save()
            .then(() => res.send('I change my mind, this joke is so fun'))
            .catch(err => res.send(err))
            //====== Update Number Like =========
          }
          
        }
      })
      .catch(err => res.send(err));
    });
  },

  dislikeJoke: (req, res) => {
    //res.send('dislike joke');
    const id = req.params.id;
    const updateStatus = {jStatus: false};
    const token = req.headers.authorization.split(' ')[1];
    //console.log('token', token);

    //verify user
    jwt.verify(token, 'uiop890abc', (err, decoded) => {
      if(err) return res.send(err)
      UserJoke.findOne({uID: decoded.id})
      .then(result => {
        if(result === null){
          //create new record
          const userjoke = new UserJoke();
            userjoke.uID = decoded.id;
            userjoke.jokeId = jokeid;
            userjoke.jokeStatus = false;
          userjoke.save()
            .then(result => res.send('this joke is so ..., I dont like it'))
            .catch(err => res.send(err));
          //====== Update Number Like =========
        }else{
          //check status joke is like(true) or not
          if(!result.jokeStatus){
            return res.send('this joke has already unlike by you, dont spam!!')
          }else{
            //update joke status
            result.jokeStatus = false;
            result.save()
            .then(() => res.send('I change my mind, this joke is not fun'))
            .catch(err => res.send(err))
            //====== Update Number Like =========
          }
          
        }
      })
      .catch(err => res.send(err));
    });
  },
  
  resetId: (req, res) => {
    var joke = new Joke();
      joke.resetCount((err,nextcount)=>{
        res.send(`reset success next count ${nextcount}`);
      });
  }
};