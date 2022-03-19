const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const usersRepo = require('./repositories/users')

const authRouter = require('./routes/admin/auth');

const app = express();
const path = require('path');

//We are not using ejs at this point in the project
// app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({
    keys: ['jpldze7815lxmsakja627g']
}))

app.use(authRouter);

app.listen(3000, ()=> {
    console.log('App is listening on port 3000');
})