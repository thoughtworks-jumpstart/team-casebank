const test_mongodb = require("./in_memory_mongodb_setup");
const mongoose = require("mongoose");

beforeAll(test_mongodb.setup);
afterAll(test_mongodb.teardown);
const User = require("../schemas/User");

describe("User model", () => {
  const name = "jane";
  const email = "jane@example.com";
  const phone = 999;

  let user = new User({ name, email, phone });

  it("fields defined in the schema can be saved", async () => {
    let result = await user.save();
    expect(result.name).toBe("jane");
  });

  it("fields not defined in the schema cannot be saved", async () => {
    let result = await user.save();
    expect(result.phone).toBeUndefined();
  });

  const name1 = "tom";
  const email1 = "tom@example.com";
  let dummy = new User({ name: name1, email: email1 });
  beforeEach(async () => await dummy.save());

  it("can be searched by _id", async () => {
    let searchResult = await User.findById(dummy._id);
    expect(searchResult.name).toEqual(name1);
    expect(searchResult.email).toEqual(email1);
  });
});

describe("Unique email field in User model", () => {
  const name1 = "kevin";
  const email1 = "kevin@example.com";

  const name2 = "gordon";
  const email2 = "gordon@example.com";

  let user1 = new User({ name: name1, email: email1 });

  beforeEach(async () => await user1.save());

  it("should not allow two users with the same email", async () => {
    let userWithSameEmail = new User({ name: name2, email: email1 });
    await expect(userWithSameEmail.save()).rejects.toThrow(
      "duplicate key error"
    );
  });
});
