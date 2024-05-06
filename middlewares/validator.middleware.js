import { body, validationResult } from 'express-validator'
/**Registration validation middleware */
export const validateUser = async(req, res, next) => {
    const rules = [
        body('name').notEmpty().withMessage("Name is required"),
        body('email').notEmpty().withMessage("Email is required"),
        body('email').isEmail().withMessage("Invalid email"),
        body('password').notEmpty().withMessage('Password is required'),
        body('password').isLength({ min: 8 }).withMessage('password must be between 8 and 16 characters long and contain at least one uppercase letter and one lowercase letter'),
        body('password').isLength({ max: 16 }).withMessage('password must be between 8 and 16 characters long and contain at least one uppercase letter and one lowercase letter'),
    ]

    await Promise.all(rules.map(rule => rule.run(req)));

    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
        const errors = validationErrors.array();
        return res.render('user-register', { "error": errors[0], user: null, projectId: null });
    }
    next();
}

//User Login validator
export const validateUserLogin = async(req, res, next) => {
    const rules = [
        body('email').notEmpty().withMessage("Email is required"),
        body('email').isEmail().withMessage("Invalid email"),
        body('password').notEmpty().withMessage('Password is required')
    ]

    await Promise.all(rules.map(rule => rule.run(req)));

    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
        const errors = validationErrors.array();
        return res.render('user-login', { "error": errors[0], user: null, projectId: null });
    }
    next();
}

//reset password email validation

export const emailValidator = async(req, res, next) => {
    const rules = [
        body('email').notEmpty().withMessage("Email is required"),
        body('email').isEmail().withMessage("Invalid email"),
    ]
    await Promise.all(rules.map(rule => rule.run(req)));

    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
        const errors = validationErrors.array();
        return res.render('user-password-reset', { "error": errors[0], user: null, projectId: null });
    }
    next();
}

export const passwordValidator = async(req, res, next) => {
    const rules = [
        body('newPassword').notEmpty().withMessage("Password is required"),
        body('newPassword').isLength({ min: 8 }).withMessage("Password should be greater than 8"),
        body('newPassword').isLength({ max: 16 }).withMessage("Password should be not be greater than 16"),
        body('confirmPassword').notEmpty().withMessage("Password is required"),
        body('confirmPassword').isLength({ min: 8 }).withMessage("Password should be greater than 8"),
        body('confirmPassword').isLength({ max: 16 }).withMessage("Password should be not be greater than 16"),
    ]
    await Promise.all(rules.map(rule => rule.run(req)));

    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
        const errors = validationErrors.array();
        return res.render('user-new-password', { "error": errors[0], user: null, projectId: null });
    }
    next();
}


export const otpValidator = async(req, res, next) => {
    const rules = [
        body('otp').notEmpty().withMessage("Otp is required"),
        body('otp').isLength({ min: 6 }).withMessage("Invalid Otp"),
        body('otp').isLength({ max: 6 }).withMessage("Invalid Otp"),
    ]
    await Promise.all(rules.map(rule => rule.run(req)));

    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
        const errors = validationErrors.array();
        return res.render('user-otp-verify', { "error": errors[0], user: null, projectId: null });
    }
    next();
}