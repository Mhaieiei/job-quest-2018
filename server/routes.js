var JokeController = require('./controllers/JokeController');
var UserController = require('./controllers/UserController');

module.exports = (app) => {

  //Joke Management
  app.get('/', JokeController.getAllJokes);
  app.post('/', JokeController.addNewJoke);
  app.get('/resetid', JokeController.resetId);
  app.get('/:id', JokeController.getJokeByID);
  app.delete('/:id', JokeController.deleteJokeByID);
  app.post('/:id/like', JokeController.likeJoke);
  app.post('/:id/dislike', JokeController.dislikeJoke);

  //User Management
  app.post('/register', UserController.createUser);
  app.post('/login', UserController.loginUser);
  
  
}