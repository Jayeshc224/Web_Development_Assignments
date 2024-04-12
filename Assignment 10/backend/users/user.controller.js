const User = require("../models/userModel");
var fs = require("fs-extra");
const { genSaltSync, hashSync } = require("bcrypt");
const path = require("path");
var bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { decode } = require("punycode");

module.exports = {
  createUser: async (req, res) => {
    try {
      const body = req.body;
      if (
        !Object.hasOwn(body, "name") ||
        !Object.hasOwn(body, "email") ||
        !Object.hasOwn(body, "password") ||
        !Object.hasOwn(body, "type") ||
        (body.type != "Employee" && body.type != "Admin")
      ) {
        return res.status(400).json({
          message: "Bad Request",
        });
      }

      var regExEmail = /([\w\.]+)@northeastern\.edu/;
      var regExPassword1 = /(?=.*[0-9])/;
      var regExPassword2 = /(?=.*[!@#$%^&*])/;

      if (
        body.password.length < 8 ||
        !body.password.match(regExPassword1) ||
        !body.password.match(regExPassword2) ||
        !body.email.match(regExEmail)
      ) {
        return res
          .status(400)
          .json({ message: "Invalid email or weak password" });
      }

      const salt = genSaltSync(10);
      body.password = hashSync(body.password, salt);
      const { email, name, password, type } = body;

      if (await User.findOne({ email })) {
        return res.status(409).json({
          message: "User already exists",
        });
      }

      const newUser = new User({
        email,
        name,
        password,
        type,
      });

      await newUser.save();

      fs.ensureDirSync(`../frontend/job-portal/public/user_images/${email}/`);

      res.status(201).json({ message: "User created successfully" });
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  getAllUsers: async (req, res) => {
    try {
      const users = await User.find(
        {},
        { _id: 0, __v: 0, password: 0, imagePaths: 0 }
      );
      return res.json(users);
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  deleteUser: async (req, res) => {
    const email = req.query.userEmail;
    const query = { email: email };
    const result = await User.deleteOne(query);

    if (result.deletedCount === 1) {
      fs.remove(
        path.resolve(`../frontend/job-portal/public/user_images/${email}`)
      );
      return res.status(200).json({
        message: "User deleted successfully",
      });
    } else {
      return res.status(404).json({
        message: "User not found",
      });
    }
  },

  editUser: async (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    const { email, name, password } = body;

    var myquery = { email: email };
    var newvalues = { $set: { name: name, password: password } };

    const result = await User.updateOne(myquery, newvalues);

    if (result.modifiedCount === 1) {
      return res.status(200).json({
        message: "User updated successfully",
      });
    } else {
      return res.status(404).json({
        message: "User not found",
      });
    }
  },

  uploadImage: async (req, res) => {
    try {
      if (!req.file || !req.body.userId) {
        if (req.file) {
          fs.unlink(
            `../frontend/job-portal/public/user_images/${req.file.originalname}`
          );
        }

        return res
          .status(400)
          .json({ message: "Missing image file or user ID" });
      }

      const email = req.body.userId;

      if (!(await User.findOne({ email }))) {
        fs.unlink(
          `../frontend/job-portal/public/user_images/${req.file.originalname}`
        );
        return res.status(404).json({
          message: "User not found",
        });
      }

      const fileNameWithoutExtension = path.basename(
        req.file.originalname,
        path.extname(req.file.originalname)
      );
      const extension = path.extname(req.file.originalname);

      const imagePath = `../frontend/job-portal/public/user_images/${
        req.body.userId
      }/${fileNameWithoutExtension}_${Date.now()}${extension}`;
      fs.move(
        `../frontend/job-portal/public/user_images/${req.file.originalname}`,
        imagePath,
        {
          overwrite: true,
        }
      );

      const relativePath = `public/user_images/${
        req.body.userId
      }/${fileNameWithoutExtension}_${Date.now()}${extension}`;

      await User.updateOne(
        { email: email },
        {
          $push: {
            imagePaths: relativePath,
          },
        }
      );

      res
        .status(200)
        .json({ message: "Image uploaded successfully", relativePath });
    } catch (error) {
      res.status(500).json({ message: "Failed to upload image" });
    }
  },

  getImages: async (req, res) => {
    function readImageFiles(dirPath, fileList) {
      const files = fs.readdirSync(dirPath);

      files.forEach((file) => {
        const filePath = path.join(dirPath, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
          readImageFiles(filePath, fileList);
        } else if (/\.(jpg|jpeg|png|gif)$/i.test(filePath)) {
          fileList.push(filePath);
        }
      });
    }

    const imagesDir = path.join(
      __dirname,
      "../../frontend/job-portal/public/user_images"
    );

    const imagePaths = [];
    readImageFiles(imagesDir, imagePaths);
    const modifiedPaths = imagePaths.map((path) =>
      path.replace(/^.*public\\/, "")
    );
    res.json(modifiedPaths);
  },

  checkUserExists: async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ email: username });
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign(
        { userName: user.email, userType: user.type },
        "secret_key",
        {
          expiresIn: "1h",
        }
      );
      req.session.token = token;

      return res.status(200).json({
        message: "User Found",
        userType: user.type,
        token: token,
      });
    } else {
      return res.status(404).json({
        message: "User Not Found",
      });
    }
  },

  checkSession: async (req, res) => {
    const token = req.headers.authorization;
    if (token) {
      jwt.verify(token.split(" ")[1], "secret_key", (err, decoded) => {
        if (err) {
          return res.json({ valid: false, userMatch: false });
        } else if (decoded.userType !== req.headers["user-type"]) {
          return res.json({ valid: true, userMatch: false });
        }
        return res.json({ valid: true, userMatch: true });
      });
    } else {
      return res.json({ valid: false, userMatch: false });
    }
  },
};
