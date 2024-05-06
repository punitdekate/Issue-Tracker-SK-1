import express from 'express';
import UserController from '../../controllers/user/user.controller.js';
import { validateUser, validateUserLogin, emailValidator, passwordValidator, otpValidator } from '../../../middlewares/validator.middleware.js';
import { auth } from '../../../middlewares/auth.js';
import ProjectController from '../../controllers/project/project.controller.js';

const userRouter = express.Router();
const projectController = new ProjectController();
const userController = new UserController();

userRouter.get('/', (req, res, next) => {
    userController.showLogin(req, res, next);
});

userRouter.get('/register', (req, res, next) => {
    userController.showRegister(req, res, next);
});

userRouter.post('/register', validateUser, (req, res, next) => {
    userController.registerUser(req, res, next);
});

userRouter.get('/login', (req, res, next) => {
    userController.showLogin(req, res, next);
});

userRouter.post('/login', validateUserLogin, (req, res, next) => {
    userController.loginUser(req, res, next);
});



userRouter.post('/forget-password/otp', auth, otpValidator, (req, res, next) => {
    userController.verifyResetOtp(req, res, next);
});

userRouter.post('/forget-password/reset-password', auth, passwordValidator, (req, res, next) => {
    userController.resetPassword(req, res, next);
});

userRouter.get('/forget-password/resend-otp', auth, (req, res, next) => {
    userController.resendOtp(req, res, next);
});

userRouter.post('/forget-password', emailValidator, (req, res, next) => {
    userController.sendOtp(req, res, next);
});

userRouter.get('/forget-password', (req, res, next) => {
    userController.showForgetPassword(req, res, next);
});

















export { userRouter };