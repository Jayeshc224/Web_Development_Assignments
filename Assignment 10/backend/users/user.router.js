const express = require("express");
const multer = require("multer");
const router = express.Router();

const {
  createUser,
  getAllUsers,
  deleteUser,
  editUser,
  uploadImage,
  getImages,
  checkUserExists,
  checkSession,
} = require("./user.controller");

router.post("/create", createUser);
router.get("/getAll", getAllUsers);
router.delete("/delete", deleteUser);
router.put("/edit", editUser);
router.get("/getImages", getImages);
router.post("/authenticate", checkUserExists);
router.get("/checkSession", checkSession);

const storage = multer.diskStorage({
  destination: async function (req, file, cb) {
    cb(null, "../frontend/job-portal/public/user_images");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const fileFilter = function (req, file, cb) {
  const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

router.post("/uploadImage", upload.single("image"), uploadImage);

module.exports = router;
