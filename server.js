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

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("PortfolioKash").command({ ping: 1 });

        // const collection = client.db("PortfolioKash").collection("Users");
        // const documents = await collection.find({}).toArray();
        console.log("Connected successfully to server");
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
run().catch(console.dir);

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

    try {
        await client.connect();
        const db = client.db("PortfolioKash");
        const collection = db.collection("Users");
        const existingUser = await collection.findOne({ username });

        if (existingUser) {
            res.status(400).json({ status: 'error', message: 'Username already exists' });
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const result = await collection.insertOne({
                username,
                password: hashedPassword,
                firstName,
                lastName,
                email,
                gender,
                nationality,
                phoneNumber
            });

            if (result.acknowledged === true) {
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