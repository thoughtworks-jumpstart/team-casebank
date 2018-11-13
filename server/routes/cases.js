const express = require("express");
const router = express.Router();

// Cases API

router.get("/test", (req, res) => {
  res.status(200).json({
    message: "Welcome to casebank project"
  });
});

module.exports = router;
