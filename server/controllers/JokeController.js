

module.exports = {
  getAllJokes: (req, res) => {
    res.send('get all joke');
  },
  addNewJoke: (req, res) => {
    res.send('add new joke');
  },
  getJokeByID: (req, res) => {
    const id = req.params.id;
    res.send(`get joke by id ${id}`);
  },
  deleteJokeByID: (req, res) => {
    const id = req.params.id;
    res.send(`delete joke by id ${id}`);
  },
  likeJoke: (req, res) => {
    res.send('like joke');
  },
  dislikeJoke: (req, res) => {
    res.send('dislike joke');
  }
};