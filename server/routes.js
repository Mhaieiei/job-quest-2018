var JokeController = require('./controllers/JokeController');

module.exports = (app) => {
  app.get('/', JokeController.getAllJokes);
  app.post('/', JokeController.addNewJoke);
  app.get('/:id', JokeController.getJokeByID);
  app.delete('/:id', JokeController.deleteJokeByID);
  app.post('/:id/like', JokeController.likeJoke);
  app.post('/:id/dislike', JokeController.dislikeJoke);
}