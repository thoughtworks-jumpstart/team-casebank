const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
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
