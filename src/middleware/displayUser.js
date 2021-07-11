const jwt = require("jsonwebtoken");
 const config = require("../config/auth/config.js");
const User = require('../app/models/User');
const Role = require('../app/models/Role');
module.exports = function displayUser(req, res, next){
  // res.json({_id: req.userId})
 
    User.findOne({_id: req.userId})
    .then(user => {res.locals.user ={username : user.username}})
    .catch( err => {res.send('xịt')})   
    next()
  
      
}