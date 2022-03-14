const express = require('express');
const usersRepo = require('../../repositories/users');

const router = express.Router();

router.get('/signup', (req, res) => {
    res.send(`
    <div>
        Your id is: ${req.session.userId}
        <form method="POST">
            <input type="text" name="email" id="" placeholder="email">
            <input type="text" name="password" id="" placeholder="password">
            <input type="text" name="passwordConfirmation" id="" placeholder="password confirmation">
            <button>Sign Up</button>
        </form>
    </div>
    `);
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
    res.send(`
    <div>
    <form method="POST">
        <input type="text" name="email" id="" placeholder="email">
        <input type="text" name="password" id="" placeholder="password">
        <button>Sign In</button>
    </form>
</div>
    `)
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