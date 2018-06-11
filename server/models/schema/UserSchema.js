const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      bcrypt = require('bcrypt-nodejs');

// Define user model
const userSchema = new Schema({
  username: { type: String, unique: true, lowercase: true },
  password: String,
});

userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
  console.log('compare password', bcrypt.compareSync(password, this.password));
  return bcrypt.compareSync(password, this.password);
};


// Create the model class
const UserModel = mongoose.model('user', userSchema);

module.exports = UserModel;
