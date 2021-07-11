//const newsRouter = require('./news');
const siteRouter = require('./site');
const coursesRouter = require('./courses');
const meRouter = require('./me');
const authRouter = require('./auth');

const authJwt  = require("../../middleware/authJwt");
const displayUser  = require("../../middleware/displayUser");

function route(app) {
    app.use(function(req, res, next) {
        res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.use('/auth', authRouter);
    app.use('/me',[authJwt.verifyToken, authJwt.isAdmin],displayUser, meRouter);
    app.use('/courses', authJwt.verifyToken,displayUser,coursesRouter);
    //app.use('/news', newsRouter);
    app.use('/', siteRouter);
}

module.exports = route;

//Luong di: o file index.js goc di tu route(app) -> index.js
//cua folder route -> co function handle(doc theo document)
