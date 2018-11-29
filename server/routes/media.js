const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: "newzealot",
  api_key: "951774497263237",
  api_secret: "MxQPc6Rgs7c5zckROzd3vjvHdZ8"
});

router.get("/", async (req, res) => {
  const image = await cloudinary.v2.uploader.upload(
    "http://res.cloudinary.com/demo/image/upload/couple.jpg",
    { tags: "basic_sample" },
    function(err, image) {
      if (err) {
        console.warn(err);
      }
      return image;
    }
  );
  console.log(image.url);
  res.status(200).json(JSON.stringify(image.url));
});
module.exports = router;
