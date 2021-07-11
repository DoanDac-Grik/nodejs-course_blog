const express = require('express');
const router = express.Router();
const courseController = require('../../app/controllers/CourseController');

const authJwt  = require("../../middleware/authJwt");
const displayUser  = require("../../middleware/displayUser");

router.get('/show', courseController.show);
router.get('/learn/:id',authJwt.verifyToken,displayUser, courseController.learn);

router.get('/create', [authJwt.verifyToken, authJwt.isAdmin],displayUser,courseController.create);
router.post('/store', [authJwt.verifyToken, authJwt.isAdmin],displayUser,courseController.store);
router.get('/:id/edit', [authJwt.verifyToken, authJwt.isAdmin],displayUser,courseController.edit);
router.post('/handle-form-actions',[authJwt.verifyToken, authJwt.isAdmin],displayUser, courseController.handleFormActions);

router.put('/:id',[authJwt.verifyToken, authJwt.isAdmin],displayUser, courseController.update);
router.delete('/:id',[authJwt.verifyToken, authJwt.isAdmin],displayUser, courseController.destroy);
router.patch('/:id/restore',[authJwt.verifyToken, authJwt.isAdmin],displayUser, courseController.restore);
router.delete('/:id/force', [authJwt.verifyToken, authJwt.isAdmin],displayUser, courseController.forceDestroy);

 module.exports = router;