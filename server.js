const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const bcrypt = require('bcrypt');
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://jackwill7080:Kashyap7080@portfoliokash.kyrqmza.mongodb.net/?retryWrites=true&w=majority";

const app = express();
const port = process.env.PORT || 3000;


const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

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


app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        await client.connect();

        const db = client.db("PortfolioKash");

        const collection = db.collection("Users");

        const user = await collection.findOne({ username: username });

        if (user) {
            bcrypt.compare(password, user.password, async (err, result) => {
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
    } finally {
        await client.close();
    }
});



app.post('/register', async (req, res) => {
    const { username, password, confPassword, firstName, lastName, email, gender, country, phoneNumber } = req.body;
    let validations = [];
    let regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])(?=.*[a-z])/;

    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let passwordMessage = '';

    if (!username) {
        validations.push({ key: 'username', message: 'Username is required' });
    } else {
        if (username && (username.length > 15 || username.length <= 4)) validations.push({ key: 'username', message: 'Username should be between 5 to 15 characters long' })
    }

    if (password !== confPassword) {
        validations.push({ key: 'password', message: 'Password and Confirm Password should be same' });
    }
    else {
        if (password) {
            if (password.length < 8 || password.length > 20) {
                passwordMessage = 'Password Sould be Between between 8 to 20 characters.';
            } else {

                if (!regex.test(password)) {
                    passwordMessage = 'Password should contain atleast one number, one special character and one uppercase letter.';
                }
            }
        } else {
            passwordMessage = 'Password is required.';
        }
    }

    if (passwordMessage) {
        validations.push({ key: 'password', message: passwordMessage });
    }
    if (!firstName) validations.push({ key: 'firstName', message: 'First name is required' });
    if (!lastName) validations.push({ key: 'lastName', message: 'Last name is required' });
    if (!email) validations.push({ key: 'email', message: 'Email is required' });
    else if (!emailRegex.test(email)) validations.push({ key: 'email', message: 'Email is not valid' });
    if (!gender) validations.push({ key: 'gender', message: 'Gender is required' });
    if (!country) validations.push({ key: 'country', message: 'Nationality is required' });
    if (!phoneNumber) validations.push({ key: 'phoneNumber', message: 'Phone number is required' });



    if (validations.length) {
        res.status(400).json({ status: 'error', validations: validations });
        return;
    }



    try {
        await client.connect();
        const db = client.db("PortfolioKash");
        const collection = db.collection("Users");
        const countersCollection = db.collection("Counters");
    
        // Get the counter document for userId
        let counter = await countersCollection.findOne({ _id: "userId" });
        if (!counter) {
            // If not found, create it
            await countersCollection.insertOne({ _id: "userId", seq: 0 });
            counter = await countersCollection.findOne({ _id: "userId" });
        }
    
        // Increment the userId
        const userId = counter.seq + 1;
    
        const existingUser = await collection.findOne({ username });
    
        if (existingUser) {
            res.status(400).json({ status: 'error', message: 'Username already exists' });
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const result = await collection.insertOne({
                userId, // Use the incremented userId
                username,
                password: hashedPassword,
                firstName,
                lastName,
                email,
                gender,
                country,
                phoneNumber
            });
    
            if (result.acknowledged === true) {
                // Update the counter in the database
                await countersCollection.updateOne({ _id: "userId" }, { $set: { seq: userId } });
    
                res.json({ status: 'success', message: 'Registration successful!' });
            } else {
                res.status(400).json({ status: 'error', message: 'Registration failed' });
            }
        }
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'An error occurred during registration' });
    } finally {
        await client.close();
    }
});