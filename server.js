const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const fs = require('fs');

const bcrypt = require('bcrypt');


const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());



app.listen(port, () => console.log(`Listening on port ${port}`));

// Middleware for verifying JWT
function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        jwt.verify(bearerToken, 'your-secret-key', (err, data) => {
            if (err) {
                res.status(403).json({ message: 'Unauthorized' });
            } else {
                req.userData = data;
                next();
            }
        });
    } else {
        res.status(403).json({ message: 'Unauthorized' });
    }
}

// Use the middleware in your route
app.get('/express_backend', verifyToken, (req, res) => {
    res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});


app.post('/login', (req, res) => {
    const { username, password } = req.body;

    fs.readFile('users.json', (err, data) => {
        if (err) throw err;

        let users = JSON.parse(data);
        let user = users.find((user) => user.username === username);

        if (user) {
            bcrypt.compare(password, user.password, (err, result) => {
                if (result) {
                    const token = jwt.sign({ username: user.username }, 'your-secret-key', { expiresIn: '1h' });
                    res.json({ status: 'success', message: 'Login successful!', token: token });
                } else {
                    res.status(400).json({ status: 'error', message: 'Invalid username or password' });
                }
            });
        } else {
            res.status(400).json({ status: 'error', message: 'Invalid username or password' });
        }
    });
});



app.post('/register', (req, res) => {
    const { username, password } = req.body;

    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            res.status(500).json({ error: err });
        } else {
            fs.readFile('users.json', (err, data) => {
                if (err) throw err;

                let users = JSON.parse(data);
                users.push({ username: username, password: hash });

                fs.writeFile('users.json', JSON.stringify(users), (err) => {
                    if (err) throw err;
                    res.json({ status: 'success', message: 'User registered successfully!' });
                });
            });
        }
    });
});