const express = require('express');
const app = express();
const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))


app.get('/', (req, res) => {
    res.send(`
    <div>
        <form method="POST">
            <input type="text" name="email" id="" placeholder="email">
            <input type="text" name="password" id="" placeholder="password">
            <input type="text" name="passwordConfirmation" id="" placeholder="password confirmation">
            <button>Sign Up</button>
        </form>
    </div>
    `);
})

app.post('/', (req, res) => {
    req.on('data', data => {
        const parsed = data.toString('utf8').split('&');
        const formData = {};
        for(let pair of parsed) {
            const [key, value] = pair.split('=');
            formData[key] = value;
        }
        console.log(formData);
    })
    res.send('Posted babe!')
})

app.get('/admin/signup', (req, res) => {
    
})

app.get('/admin/signin', (req, res) => {

})

app.listen(3000, ()=> {
    console.log('App is listening on port 3000');
})