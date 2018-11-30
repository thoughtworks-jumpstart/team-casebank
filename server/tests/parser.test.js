const {
  parseForImageUrls,
  uploadImages,
  replaceImageUrls
} = require("../cloudinaryUtils/parser");
const { sampleHtml } = require("../tests/parser_sample_data");

describe("Parser tests", () => {
  it("should return all image urls in html", () => {
    const html =
      '<img src="http://site.org/one.jpg" />\n <img src="http://site.org/two.jpg" />\n <img src="http://site.org/three.jpg" />';

    const imageUrls = parseForImageUrls(html);

    expect(imageUrls.length).toEqual(3);
    expect(imageUrls[0]).toEqual("http://site.org/one.jpg");
    expect(imageUrls[1]).toEqual("http://site.org/two.jpg");
    expect(imageUrls[2]).toEqual("http://site.org/three.jpg");
  });

  it("should return all image urls in complex html", () => {
    const imageUrls = parseForImageUrls(sampleHtml);

    expect(imageUrls.length).toEqual(2);
    expect(imageUrls[0]).toEqual(
      "https://dynamic.thoughtworks.com/clients/logo-44479f965764ede8761332bf52c154bc.png"
    );
    expect(imageUrls[1]).toEqual(
      "https://dynamic.thoughtworks.com/clients/pepsi-mtv-indies/pepsi-mtv-indies-mobile-screenshot.png"
    );
  });

  it.only("Should ignore all cloudinary urls", () => {
    const html =
      '<img src="http://res.cloudinary.com/newzealot/image/upload/v1543481488/pz80s84nu53uveurc1fw.png"/>\n <img src="http://res.cloudinary.com/newzealot/image/upload/v1543481488/fqfhm2qcowoeufgevgue.png" />';
    const imageUrls = parseForImageUrls(html);
    expect(imageUrls.length).toEqual(0);
  });

  it("should return cloudinary urls", async () => {
    const imageUrls = [
      "https://dynamic.thoughtworks.com/clients/logo-44479f965764ede8761332bf52c154bc.png",
      "https://dynamic.thoughtworks.com/clients/pepsi-mtv-indies/pepsi-mtv-indies-mobile-screenshot.png"
    ];
    const cloudinaryUrls = await uploadImages(imageUrls);
    expect(cloudinaryUrls.length).toEqual(2);
  });

  it("should replace all urls to cloudinary urls", () => {
    const cloudinaryUrls = {
      "https://dynamic.thoughtworks.com/clients/logo-44479f965764ede8761332bf52c154bc.png":
        "http://res.cloudinary.com/newzealot/image/upload/v1543481488/pz80s84nu53uveurc1fw.png",
      "https://dynamic.thoughtworks.com/clients/pepsi-mtv-indies/pepsi-mtv-indies-mobile-screenshot.png":
        "http://res.cloudinary.com/newzealot/image/upload/v1543481488/fqfhm2qcowoeufgevgue.png"
    };

    const originalHtml =
      '<img src="https://dynamic.thoughtworks.com/clients/logo-44479f965764ede8761332bf52c154bc.png" />\n <img src="https://dynamic.thoughtworks.com/clients/pepsi-mtv-indies/pepsi-mtv-indies-mobile-screenshot.png"/>';

    const expectedHtml =
      '<img src="http://res.cloudinary.com/newzealot/image/upload/v1543481488/pz80s84nu53uveurc1fw.png" />\n <img src="http://res.cloudinary.com/newzealot/image/upload/v1543481488/fqfhm2qcowoeufgevgue.png"/>';

    const updatedHtml = replaceImageUrls(originalHtml, cloudinaryUrls);
    expect(updatedHtml).toEqual(expectedHtml);
  });

  it("should replace all urls to cloudinary urls in complex html", () => {
    const cloudinaryUrls = {
      "https://dynamic.thoughtworks.com/clients/logo-44479f965764ede8761332bf52c154bc.png":
        "http://res.cloudinary.com/newzealot/image/upload/v1543481488/pz80s84nu53uveurc1fw.png",
      "https://dynamic.thoughtworks.com/clients/pepsi-mtv-indies/pepsi-mtv-indies-mobile-screenshot.png":
        "http://res.cloudinary.com/newzealot/image/upload/v1543481488/fqfhm2qcowoeufgevgue.png"
    };

    const updatedHtml = replaceImageUrls(sampleHtml, cloudinaryUrls);
    console.log(updatedHtml);
    expect(updatedHtml).toContain(
      "http://res.cloudinary.com/newzealot/image/upload/v1543481488/pz80s84nu53uveurc1fw.png"
    );
    expect(updatedHtml).toContain(
      "http://res.cloudinary.com/newzealot/image/upload/v1543481488/fqfhm2qcowoeufgevgue.png"
    );
  });
});
