const Course = require('../models/Course.js')
const User = require('../models/User.js')
const { mutipleMongooseToObject} = require('../../util/mongoose.js');
class SiteController {
    //[Get] /home
    index(req, res, next) {
        Course.find({})
            .then(courses => {
                res.render('home', {courses: mutipleMongooseToObject(courses)});
            })
            .catch(next);
        
    }
}

module.exports = new SiteController();
