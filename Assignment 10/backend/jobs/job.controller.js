const Job = require("../models/jobModel");

module.exports = {
  createJob: async (req, res) => {
    {
      try {
        const body = req.body;
        if (
          !Object.hasOwn(body, "Company_Name") ||
          !Object.hasOwn(body, "Title") ||
          !Object.hasOwn(body, "Description") ||
          !Object.hasOwn(body, "Salary")
        ) {
          return res.status(400).json({
            message: "Bad Request",
          });
        }

        const { Company_Name, Title, Description, Salary } = body;

        const newJob = new Job({
          Company_Name,
          Title,
          Description,
          Salary,
        });

        await newJob.save();

        res.status(201).json({ message: "Job created successfully" });
      } catch (err) {
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  },
  getJobs: async (req, res) => {
    try {
      const jobs = await Job.find({}, { __v: 0 });
      return res.json(jobs);
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
};
