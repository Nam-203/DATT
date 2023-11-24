const Router = require('express').Router();
<<<<<<< HEAD
const authController = require('../../app/controllers/controller.user');
const userController = require('../../app/controllers/controller.user');
=======
const authController = require('../../../../../../Downloads/Duanbe_CODEGOC/Duanbe_CODEGOC/app/controllers/controller.user');
const userController = require('../../../../../../Downloads/Duanbe_CODEGOC/Duanbe_CODEGOC/app/controllers/controller.user');
>>>>>>> 21a9291ca4077a9d96c81bef9b48de1de1048f24

Router.post('/login', authController.login);
Router.post('/register', authController.register);
//update user FE(
//Router.get('/user/getAllUsers', authController.getAllUsers); //get all user detail
Router.get('/user/:id/getuser', userController.userGetByid); // get user by id
Router.put('/user/:id/update', userController.updateUserById); // update user by id
Router.post('/user/edit', authController.apiUserPostEdit); // user can update detail
Router.get('/user-info', userController.getUserInfo);
module.exports = Router;
