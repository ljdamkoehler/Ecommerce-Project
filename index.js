const express = require('express');
const app = express();
const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))


app.get('/', (req, res) => {
    res.send('Hi man!!')
})

app.get('/admin/signup', (req, res) => {
    res.render('adminSignup')
})

app.get('/admin/signin', (req, res) => {

})

app.listen(3000, ()=> {
    console.log('App is listening on port 3000');
})