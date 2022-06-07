const { check } = require('express-validator');
const usersRepo = require('../../repositories/users');
const productsRepo = require('../../repositories/products');

module.exports = {
    requireTitle: check('title')
        .trim()
        .isLength({ min: 5, max: 40 })
        .withMessage('Must be bewtween 5 and 40 characters!'),
    requirePrice: check('price')
        .trim()
        .toFloat()
        .isFloat({ min: 1 })
        .withMessage('Must be a number greater than or equal to one!'),
    requireEmail: check('email')
        .trim()
        .normalizeEmail()
        .isEmail()
        .withMessage('Must be a valid email')
        .custom( async (email) => {
                const existingUser = await usersRepo.getOneBy({ email });
            if(existingUser) {
                throw new Error('Email in use')
            }
        }),

    requirePassword: check('password')
        .trim()
        .isLength({ min: 8, max: 20 })
        .withMessage('Password must be between 8 and 20 characters'),

    requirePasswordConfirmation: check('passwordConfirmation')
        .trim()
        .isLength({ min: 8, max: 20 })
        .withMessage('Password must be between 8 and 20 characters')
        .custom((passwordConfirmation, { req }) => {
            if(passwordConfirmation !== req.body.password) {
                throw new Error('Passwords must match')
            } else {
                return true
            }
        }),

    requireEmailExists:  check('email')
        .trim()
        .normalizeEmail()
        .isEmail()
        .withMessage('Must signin with a valid email')
        .custom( async (email) => {
            const user = await usersRepo.getOneBy({ email })
            if (!user) {
                throw new Error('Email not found');
            }
        }),
    requireValidPasswordForUser: check('password')
        .trim()
        .custom(async (password, { req }) => {
            const user = await usersRepo.getOneBy({ email: req.body.email });
            if (!user) {
                throw new Error("Invalid password");
            }
            const validPassword = await usersRepo.comparePasswords(
                user.password, password);
            if (!validPassword) {
                throw new Error('Invalid password');
            }
        })

    
}

