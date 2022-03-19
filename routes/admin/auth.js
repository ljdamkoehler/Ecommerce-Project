const express = require('express');
const usersRepo = require('../../repositories/users');
const signupTemplate = require('../../views/admin/auth/signup');
const signinTemplate = require('../../views/admin/auth/signin');
const signin = require('../../views/admin/auth/signin');

const router = express.Router();

router.get('/signup', (req, res) => {
    res.send(signupTemplate({ req }));
})



router.post('/signup', async (req, res) => {
    const { email, password, passwordConfirmation } = req.body;
    const existingUser = await usersRepo.getOneBy({ email });
    if(existingUser) {
        return res.send('Email in use.')
    }
    if(password !== passwordConfirmation) {
        return res.send('Password and password confirmation do not match!')
    }
    const { id } = await usersRepo.create({ email, password });

    req.session.userId = id;

    res.send('Posted babe!');
})

router.get('/signout', (req, res) => {
    req.session = null;
    res.send('You are logged out!')
})

router.get('/signin', (req, res) => {
    res.send(signinTemplate({ req }));
})

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    const user = await usersRepo.getOneBy({ email });

    if (!user) {
        return res.send('Email not found!');
    }

    const validPassword = await usersRepo.comparePasswords(
        user.password, password);

   
    if (!validPassword) {
        return res.send('Incorrect password!');
    }

    req.session.userId = user.id;

    res.send('You are signed in!!');
})

module.exports = router;