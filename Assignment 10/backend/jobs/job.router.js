const express = require("express");
const router = express.Router();

const { createJob, getJobs } = require("./job.controller");

router.post("/create/job", createJob);
router.get("/get/jobs", getJobs);

module.exports = router;
