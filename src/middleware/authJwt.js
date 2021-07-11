const jwt = require("jsonwebtoken");
 const config = require("../config/auth/config.js");
const User = require('../app/models/User');
const Role = require('../app/models/Role');


//Kiểm tra token có hợp lệ hay không? 
//Chúng ta có thể lấy thông tin token trong trường x-access-token của Header HTTP, sau đó chuyển cho hàm verify() xử lý.
verifyToken = (req, res, next) => {
  let token = req.cookies.token;
   
  //Nếu token không tồn tại-> báo lỗi
  if (!token) {
      return res.status(403).send({ message: "No token provided!" });
  }
  //Với method verify, ta tiến hành encode ra xác thực
  //ta để next() trog hàm này mà không để ở ngoài vì khi xử lí xong, mới cho qua middleware tiếp theo 
  
  jwt.verify(token, config.secret, 
    (err, decoded) => {
        if (err) {
        return res.status(401).send({ message: "Unauthorized!" });
        }
        req.userId = decoded.id;
        
        next();
});
};

//Kiểm tra role đăng ký đã có role chưa hay là trống?
isAdmin = (req, res, next) => {
  

  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    Role.find(
      {
        _id: { $in: user.roles }
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "admin") {
            next();
            return;
          }
        }
        res.status(403).send({ message: "Require Admin Role!" });
        return;
      }
    );
  });
};

//Cẩn thận!!! Không làm moderator
isModerator = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    Role.find(
      {
        _id: { $in: user.roles }
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "moderator") {
            next();
            return;
          }
        }
        res.status(403).send({ message: "Require Moderator Role!" });
        return;
      }
    );
  });
};
const authJwt = {
  verifyToken,
  isAdmin,
  isModerator
};
module.exports = authJwt;