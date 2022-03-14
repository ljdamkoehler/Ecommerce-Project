const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const authRouter = require('./routes/admin/auth');

const app = express();
const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({
    keys: ['jpldze7815lxmsakja627g']
}))
app.use(authRouter);



app.listen(3000, ()=> {
    console.log('App is listening on port 3000');
})