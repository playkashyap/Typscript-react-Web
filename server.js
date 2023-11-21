const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const fs = require('fs');

const bcrypt = require('bcrypt');


const app = express();
const port = process.env.PORT || 3000;

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
    const { username, password, firstName, lastName, email, gender, nationality, phoneNumber } = req.body;

    let validations = [];
    let regexNumber = /^(?=.*[0-9])/; // checks if password contains at least one number
    let regexSpecialChar = /^(?=.*[!@#$%^&*])/; // checks if password contains at least one special character
    let regexUppercase = /^(?=.*[A-Z])/; // checks if password contains at least one uppercase letter

    let passwordMessage = '';

    if (!username) {
        validations.push({ key: 'username', message: 'Username is required' });
    } else {
        if (username && (username.length > 10 || username.length <= 4)) validations.push({ key: 'username', message: 'Username should be between 5 to 9 characters long' })
    }

    if (password) {
        if (password.length < 8 || password.length > 20) {
            passwordMessage += 'Password Sould be Between between 8 to 20 characters.';
        } else {
            

            if (!regexNumber.test(password)) {
                passwordMessage += 'Should contain at least one number, ';
            } else {
                passwordMessage = ''
            }
            if (!regexSpecialChar.test(password)) {
                passwordMessage += 'Should contain at least one special character, ';
            } else {
                passwordMessage = ''
            }
            if (!regexUppercase.test(password)) {
                passwordMessage += 'Should contain at least one uppercase letter. ';
            } else {
                passwordMessage = ''
            }
        }
    } else {
        passwordMessage = 'Password is required.';
    }

    if (passwordMessage) {
        validations.push({ key: 'password', message: passwordMessage.trim() });
    }
    if (!firstName) validations.push({ key: 'firstName', message: 'First name is required' });
    if (!lastName) validations.push({ key: 'lastName', message: 'Last name is required' });
    if (!email) validations.push({ key: 'email', message: 'Email is required' });
    if (!gender) validations.push({ key: 'gender', message: 'Gender is required' });
    if (!nationality) validations.push({ key: 'nationality', message: 'Nationality is required' });
    if (!phoneNumber) validations.push({ key: 'phoneNumber', message: 'Phone number is required' });



    if (validations.length) {
        res.status(400).json({ status: 'error', validations: validations });
        return;
    }

    fs.readFile('users.json', (err, data) => {
        if (err) throw err;

        let users = JSON.parse(data);
        let userExists = users.some((user) => user.username === username);

        if (userExists) {
            res.status(400).json({ status: 'error', message: 'Username already exists' });
        } else {
            bcrypt.hash(password, 10, (err, hash) => {
                if (err) {
                    res.status(500).json({ error: err });
                } else {
                    users.push({
                        username: username,
                        password: hash,
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        gender: gender,
                        nationality: nationality,
                        phoneNumber: phoneNumber
                    });

                    fs.writeFile('users.json', JSON.stringify(users), (err) => {
                        if (err) throw err;
                        res.json({ status: 'success', message: 'User registered successfully!' });
                    });
                }
            });
        }
    });
});