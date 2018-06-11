const User = require('../models/schema/UserSchema');
const jwt = require('jsonwebtoken');

module.exports = {
  createUser: (req, res) => {
    console.log('create user')
    const newUser = new User();
    newUser.username = req.body.username;
    newUser.password = newUser.generateHash(req.body.password);
    console.log('newUser', newUser)
    User.findOne({username: req.body.username})
    .then(user => {
      if(user != null){
        return res.send({ status: 404, message: 'Username is already have' });
      }
      newUser.save()
      .then((createdUser) => res.send({ result: createdUser }))
      .catch(err => res.send(err));
    })
    .catch(err => res.send(err));
  },

  loginUser: (req, res) => {
    console.log('user login page');
    const username = req.body.username;
    const password = req.body.password;
    console.log('username', req.body.username)

    User.findOne({ username })
    .then(user => {
      if (!user) return res.send({ status: 404, message: 'User not found' });
      if (!user.validPassword(password)) return res.send({ status: 404, message: 'Wrong password' });
      const profile = {
        username,
        id: user.id,
      };
      const token = jwt.sign(profile, process.env.JWT_SECRET_KEY, { expiresIn: 60 * 60 * 5 });
      return res.json({ username, token });
    })
    .catch(err => res.send(err));
  }
}