
const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const User = new Schema( {
  
  username: String,
  email: String,
  password: String,
  roles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role"
    }
  ]  
},
{
  collection: 'users'
});
module.exports = mongoose.model('User', User);