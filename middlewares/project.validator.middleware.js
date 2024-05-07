import { body, validationResult } from 'express-validator'
/**Registration validation middleware */
export const validateProject = async(req, res, next) => {
    const rules = [
        body('name').notEmpty().withMessage("Project Name is required"),
        body('description').notEmpty().withMessage("Project Description is required"),
        body('type').notEmpty().withMessage('Project Type is required')
    ]

    await Promise.all(rules.map(rule => rule.run(req)));

    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
        const errors = validationErrors.array();
        return res.render('create-project', { "error": errors[0], user: req.cookies.user, projectId: null });
    }
    next();
}