
const Course = require('../models/Course');
const User = require('../models/User');
const { mongooseToObject,mutipleMongooseToObject} = require('../../util/mongoose');
class CourseController {
    //[get]/courses/learn/:id
    learn(req, res, next){
        
        Course.findOne(req.params.slug)
        .then(course => {
            res.render('courses/learn',{course: mongooseToObject(course)});
            //res.json(course);
        })
        .catch(err =>{res.json('xịt')})
    }
    //[get] /courses/show
    show(req,res, next){       
        Course.find({})
        .then(courses => {
            
            res.render('courses/show', {courses: mutipleMongooseToObject(courses)});
        })
        .catch(next);
    }
    //[get] /courses/create    
    //Render ra trang Tạo khóa học
    create(req,res, next) {
        res.render('courses/create',{username:"admin"});
    }
    //[post] /courses/store   post là gửi yêu cầu thêm dưx liệu
    store(req,res, next) {
        const formData = req.body;
        const course = new Course(formData);
        course.save()
        .then(() => res.redirect('/'))
        .catch(error => {});
        //res.json(formData);     
    }
    //get /courses/:id/edit
    edit(req,res, next){
        Course.findById(req.params.id)
        .then(course =>res.render('courses/edit', {
            course: mongooseToObject(course)
        } ))
        .catch(next);
    }
    //put /courses/:id
    update(req,res, next){
        Course.updateOne({_id: req.params.id}, req.body)
        .then(() => res.redirect('/me/stored/courses'))
        .catch(next);
    }
    //[delete] /courses/id
    destroy(req, res, next){
        Course.delete({_id: req.params.id})
        .then(() => res.redirect('back'))
        .catch(next);
    }
    //[PATCH] /courses/id/restore
    restore(req, res, next){
        Course.restore({_id: req.params.id})
        .then(() => res.redirect('back'))
        .catch(next);
    }
     //[delete] /courses/force
     forceDestroy(req, res, next){
        Course.deleteOne({_id: req.params.id})
        .then(() => res.redirect('back'))
        .catch(next);
    }
    
    //post /courses/handle-form-actions
    handleFormActions(req, res, next){
       //res.json(req.body);
       switch(req.body.action){
        case 'delete':
            //Giá trị truyền lên bây giờ là res.body.courseIds
            //Không thể chạy do courseIds là mảng
            //Sử dụng {$in: } để lấy hết _id có trong array ta submit
            Course.delete({_id: {$in: req.body.courseIds}})
            .then(() => res.redirect('back'))
            .catch(next);
            break;
        case 'restore':
            Course.restore({_id: {$in: req.body.courseIds}})
            .then(() => res.redirect('back'))
            .catch(next);
            break;
        case 'restore':
            Course.deleteOne({_id: {$in: req.body.courseIds}})
            .then(() => res.redirect('back'))
            .catch(next);
            break;    
        default:
            res.json({message: 'action invalid!!!'});
    }
    }
}
module.exports = new CourseController();