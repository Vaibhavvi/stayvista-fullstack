const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

// Create User Schema and Use Passport.js for Authentication
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  }
});

userSchema.plugin(passportLocalMongoose);

//Create model
const User = mongoose.model('User', userSchema)
module.exports = User;
