import { body } from 'express-validator';

const validateUser = [
  body('userName')
    .trim()
    .notEmpty().withMessage('Username is required')
    .isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),

  body('email')
    .normalizeEmail()
    .isEmail().withMessage('Invalid email address'),

  body('password')
    .trim()
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
    .matches(/[0-9]/).withMessage('Password must contain a number')
    .matches(/[A-Z]/).withMessage('Password must contain an uppercase letter')
];

export default validateUser;
