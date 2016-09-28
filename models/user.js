var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  username: {type : String, required: true, unique: true},
  password : {type: String, required: true},
  wallet : { type: Number, required: false}
});

module.exports = mongoose.model('User', UserSchema);
