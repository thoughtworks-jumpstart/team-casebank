const cheerio = require("cheerio");
const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

const parseForImageUrls = html => {
  const $ = cheerio.load(html);
  let results = [];
  $(":root")
    .find("img")
    .each(function() {
      results.push($(this).attr("src"));
    });
  return results;
};
//Pass the image urls to cloudinary and get the new urls
const uploadImages = async externalUrls => {
  let urls = {};
  // res_promises will be an array of promises
  let res_promises = externalUrls.map(
    externalUrl =>
      new Promise((resolve, reject) => {
        cloudinary.v2.uploader.upload(externalUrl, {}, function(error, result) {
          if (error) reject(error);
          else resolve([externalUrl, result.url]);
        });
      })
  );
  // Promise.all will fire when all promises are resolved
  await Promise.all(res_promises)
    .then(result => {
      result.forEach(res => (urls[res[0]] = res[1]));
    })
    .catch(error => {});

  return urls;
};
//Replace external urls in html with the new url
const replaceImageUrls = (html, bothUrls) => {
  let result = html;
  for (let oldUrl in bothUrls) {
    result = result.replace(oldUrl, bothUrls[oldUrl]);
  }
  return result;
};

module.exports = { parseForImageUrls, uploadImages, replaceImageUrls };
