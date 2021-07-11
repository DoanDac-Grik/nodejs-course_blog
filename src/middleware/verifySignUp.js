// const db = require("../models");
// const ROLES = db.ROLES;
// const User = db.user;
const ROLES = ['admin','user'];
const User = require('../app/models/User');
//const { mongooseToObject} = require('../../util/mongoose');  -->này khi nào cần lấy doc của Moongose

// Quá trình để verify một hành động trong SignUp, chúng ta cần làm 2 việc:
// Kiểm tra xem tên người dùng, email có bị trùng lặp trong DB hay không? 
checkDuplicateUsernameOrEmail = (req, res, next) => {
    //Sử dụng query trong mongoose. Tìm các user hoặc email có tồn tại bằng hàm if
    // Username
    User.findOne({username: req.body.username })
    .exec((err, user) => {
    if (err) {
        res.status(500).send({ message: err });
        return;
    }
    if (user) {
        res.status(400).send({ message: "Failed! Username is already in use!" });
        return;
    }
    // Email
        User.findOne({email: req.body.email})
        .exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (user) {
            res.status(400).send({ message: "Failed! Email is already in use!" });
            return;
        }
        next();
        });
  });
};

// Kiểm tra xem role đăng ký có hợp lệ hay không?
checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: `Failed! Role ${req.body.roles[i]} does not exist!`
        });
        return;
      }
    }
  }
  next();
};
const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted
};
module.exports = verifySignUp;