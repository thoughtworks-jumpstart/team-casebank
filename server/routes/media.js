const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: "newzealot",
  api_key: "951774497263237",
  api_secret: "MxQPc6Rgs7c5zckROzd3vjvHdZ8"
});

router.get("/", async (req, res) => {
  let cloudImg = cloudinary.v2.uploader.upload(
    "https://cdn1-www.dogtime.com/assets/uploads/2010/12/puppies.jpg",
    function(error, result) {
      console.log(result, error);
    }
  );
  res.status(200).json(cloudImg);
});
module.exports = router;
