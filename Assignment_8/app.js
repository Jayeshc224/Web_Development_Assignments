const express = require('express');
const bcrypt = require('bcrypt');
const multer = require('multer');
const { connectToDb, getDb } = require('./db');

const app = express();
const upload = multer({ dest: 'images/' }); // Destination folder for uploaded images

app.use(express.json());


connectToDb((err) => {
    if (err) {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1);
    }
    console.log('Connected to MongoDB');
});


app.post('/user/create', async (req, res) => {
    const { fullName, email, password } = req.body;

    // Validations
    if (!fullName || !email || !password) {
        return res.status(400).json({ error: 'Full name, email, and password are required' });
    }

    // Validate email format (you can use a more comprehensive email validation library)
    if (!isValidEmail(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
    }

    // Validate password strength (e.g., minimum length, complexity)
    if (password.length < 8) {
        return res.status(400).json({ error: 'Password must be at least 8 characters long' });
    }

    try {
        const db = getDb(); // Get the database instance

        // Hash the password before storing it in the database
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save the user details to the database
        await db.collection('users').insertOne({
            fullName: fullName,
            email: email,
            password: hashedPassword
        });

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Update User Details
app.put('/user/edit', async (req, res) => {
    const { fullName, password } = req.body;
    const { email } = req.body;; // Assuming req.user contains authenticated user data

    // Validations
    if (!fullName || !password) {
        return res.status(400).json({ error: 'Full name and password are required' });
    }

    try {
        const db = getDb(); // Get the database instance

        // Validate password strength (e.g., minimum length, complexity)
        if (password.length < 8) {
            return res.status(400).json({ error: 'Password must be at least 8 characters long' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Update user details in the database
        const result = await db.collection('users').updateOne(
            { email: email },
            { $set: { fullName: fullName, password: hashedPassword } }
        );

        if (result.modifiedCount === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ message: 'User details updated successfully' });
    } catch (error) {
        console.error('Error updating user details:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Delete User
app.delete('/user/delete', async (req, res) => {
    const { email } = req.body;// Assuming req.user contains authenticated user data

    try {
        const db = getDb(); // Get the database instance

        // Delete the user from the database
        const result = await db.collection('users').deleteOne({ email: email });

        if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Retrieve All Users
app.get('/user/getAll', async (req, res) => {
    try {
        const db = getDb(); // Get the database instance

        // Retrieve all users from the database
        const users = await db.collection('users').find().toArray();
        res.json(users);
    } catch (error) {
        console.error('Error retrieving users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Upload Image
app.post('/user/uploadImage', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No image file uploaded' });
    }

    
    const allowedFormats = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedFormats.includes(req.file.mimetype)) {
        return res.status(400).json({ error: 'Invalid image format' });
    }

    res.json({ message: 'Image uploaded successfully', imagePath: req.file.path });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Function to validate email format
function isValidEmail(email){
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}