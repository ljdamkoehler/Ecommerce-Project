const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const app = express();
const path = require('path');
const usersRepo = require('./repositories/users');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({
    keys: ['jpldze7815lxmsakja627g']
}))

app.get('/signup', (req, res) => {
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



app.post('/signup', async (req, res) => {
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

app.get('/signout', (req, res) => {
    req.session = null;
    res.send('You are logged out!')
})

app.get('/signin', (req, res) => {
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

app.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    const user = await usersRepo.getOneBy({ email });

    if (!user) {
        return res.send('Email not found!');
    }
    if (user.password !== password) {
        return res.send('Incorrect password!');
    }

    req.session.userId = user.id;

    res.send('You are signed in!!');
})

app.listen(3000, ()=> {
    console.log('App is listening on port 3000');
})