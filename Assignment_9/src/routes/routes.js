const express = require("express")
const router = express.Router()
const userData = require('../models/userdata')
const multer = require("multer")
const fs = require('fs')
var path = require('path');




//Retrieve All Users

router.get('/user/getAll', async (req, res) => {

    try {
        const users = await userData.find();
        res.status(200).json(users)

    } catch (err) {
        //500: Server Error
        res.status(500).json({ message: err.message })

    }
})

//Create User
router.post('/user/create', async (req, res) => {
    const user = new userData({
        fullName: req.body.fullName,
        email: req.body.email,
        password: req.body.password
    });
    try {
        var pw = new passwordValidator();
        pw.is().min(8).is().max(15).has().uppercase().has().lowercase();
        if (!pw.validate(req.body.password)) {
            res.status(400).send("Invalid email or weak password!");
        } else if (!validator.isEmail(req.body.email)) {
            res.status(400).send("Invalid email or weak password!");
        }
        else if (await userData.findOne({ email: req.body.email }) != null) {
            res.status(409).json("User already exists!");
        }
        else {
            bcrypt.hash(user.password, 5).then(async (hashedPassword) => {
                user.password = hashedPassword;
                await user.save();
                res.status(201).send("User created successfully");
            });
        }
    } catch (err) {
        if (err) {
            res.status(500).json({ message: err.message });
        }
    }
})



//User Login

router.get('/user/login', async (req, res) => {
    const {userEmail,password} = req.body;

    try {
        const existingUser = await userData.findOne({ email: userEmail });
        console.log(existingUser);
        if (!existingUser) {
            res.status(404).json("User not found");
        }
        else {
            console.log("user found!");
            res.json({email:existingUser.email});

        }

    } catch (error) {
        res.status(500).json({ msg: error.message });
    }

})




// Upload Image

const storage = multer.diskStorage({
    destination: './uploads/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5000000 // limit file size to 10MB
    },
});

router.post('/user/uploadImage', upload.single('image'), async (req, res) => {
    try {
        const email = req.body.email;
        if (!req.file || !email) {
            return res.status(400).json({ error: 'Missing image file or user ID!' });
        }
        const allowedFormats = ['image/jpeg', 'image/png', 'image/gif'];
        if (!allowedFormats.includes(req.file.mimetype)) {
            return res.status(400).json({ error: 'Invalid image format' });
        }

        const existingUser = await userData.findOne({ email: req.body.email });
        if (!existingUser) {
            res.status(400).json('User not found');
        }
        else {
            await userData.findOneAndUpdate({ email: email }, { image: req.file.path })
            res.status(200).json({ message: 'Image uploaded successfully', imagePath: req.file.path });
        }

    } catch (error) {
        res.status(500).json("Failed to upload image!")

    }


});

router.get('/user/getImages', async (req, res) => {

    try {
        const images = await userData.find();
        res.status(200).json(images)

    } catch (err) {
        //500: Server Error
        res.status(500).json({ message: err.message })

    }
})



module.exports = router;

