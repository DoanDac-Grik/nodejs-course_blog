//Controller cho Authentication
//Với phần này, chúng ta có 2 công việc chính cho tính năng authentication:
//  +Đăng ký: tạo người dùng mới và lưu trong cơ sở dữ liệu 
//  (với role mặc định là User nếu không chỉ định trước lúc đăng ký).
//  +Đăng nhập: quá trình đăng nhập gồm 4 bước:
//      Tìm username trong cơ sở dữ liệu.Nếu username tồn tại, so sánh password trong db
//      Nếu password khớp, tạo token bằng jsonwebtoken rồi trả về client với thông tin User kèm access-Token

const config = require("../../config/auth/config.js");
const User = require('../models/User.js');
const Role = require('../models/Role.js');
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { mongooseToObject} = require('../../util/mongoose');

 
class AuthController {
    adu(req,res,next){
        res.send('adu ');
    }
    //[GET] /auth/registerpage/
    registerPage(req, res, next) {
        res.render('auth/register');
        
    }
    //[GET] /auth/loginpage/
    loginPage(req, res, next) {
        res.render('auth/login');
        
    }
  
    //[POST] /auth/signup/submit
    signup = (req, res, next) => {
        //Hash password khi đc gửi lên
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8)
        });
        //Create user, lưu vào db  
        user.save((err, user) => {
            if (err) {
            res.status(500).send({ message: err });
            return;
            }
            if (req.body.roles) {
                Role.find(
                    {
                    name: { $in: req.body.roles }
                    },
                    (err, roles) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }
                    user.roles = roles.map(role => role._id);
                    user.save(err => {
                        if (err) {
                        res.status(500).send({ message: err });
                        return;
                        }
                        //res.send({ message: "User was registered successfully!" });
                        res.render('home',{user: mongooseToObject(user)})

                    });
                    }
                );
            } else {
                Role.findOne({ name: "user" }, (err, role) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }
                    user.roles = [role._id];
                    user.save(err => {
                        if (err) {
                            res.status(500).send({ message: err });
                            return;
                        }
                        //res.send({ message: "User was registered successfully!" });
                        res.render('home',{user: mongooseToObject(user)})
                        console.log(user);
                    });
                });
            }
        });
    };   
    //[POST] /auth/signin/submit
    signin = (req, res, next) => {
        User.findOne({username: req.body.username})
            .populate("roles", "-__v")
            .exec((err, user) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
                if (!user) {
                    return res.status(404).send({ message: "User Not found." });
                }
                //Kiểm tra passwoeed hợp lệ?
                var passwordIsValid = bcrypt.compareSync(req.body.password,user.password);
                if (!passwordIsValid) {
                    return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                    });
                }

                var token = jwt.sign({ id: user.id }, config.secret, {expiresIn: 3600 });
                res.cookie('token',token);
                
                var authorities = [];
                for (let i = 0; i < user.roles.length; i++) {
                    authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
                }
                // res.status(200).send({
                //     id: user._id,
                //     username: user.username,
                //     email: user.email,
                //     roles: authorities,
                //     accessToken: token
                // });
                //res.data({user: mongooseToObject(user)})
                
               res.redirect('http://localhost:3000/courses/show');
               // res.render('courses/show',)

            });
    };
    //[GET] /auth/logout
    logout(req, res, next) {
        res.clearCookie('token');
        res.redirect('/');
        
    };
}
module.exports = new AuthController();



        