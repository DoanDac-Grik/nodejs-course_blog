const express = require('express');
const router = express.Router();
const Authcontroller = require('../../app/controllers/AuthController');
const verifySignUp  = require("../../middleware/verifySignUp");

//Xử lí khi user signup 
router.post("/signup/submit",
    [verifySignUp.checkDuplicateUsernameOrEmail,
    verifySignUp.checkRolesExisted
    ],
    Authcontroller.signup
);
//Xử lí khi user signin
router.post("/signin/submit", Authcontroller.signin);
    
//Rend ra giao diện đăng nhập và đăng kí
router.get('/registerpage',Authcontroller.registerPage);
router.get('/loginpage',Authcontroller.loginPage);

//Đăng xuất => xóa cookie
router.get('/logout', Authcontroller.logout);

//test
router.get('/registerpage', Authcontroller.adu);

module.exports = router;
