import { body, validationResult } from 'express-validator'
/**Registration validation middleware */
export const validateProject = async(req, res, next) => {
    const rules = [
        body('name').notEmpty().withMessage("Name is required"),
        body('description').notEmpty().withMessage("Description is required"),
        body('type').notEmpty().withMessage('Type is required')
    ]

    await Promise.all(rules.map(rule => rule.run(req)));

    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
        const errors = validationErrors.array();
        return res.render('create-project', { "error": errors[0], "userEmail": req.cookies.userEmail });
    }
    next();
}