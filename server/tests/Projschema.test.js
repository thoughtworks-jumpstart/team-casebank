const test_mongodb = require("./in_memory_mongodb_setup");
const mongoose = require("mongoose");

beforeAll(test_mongodb.setup);
afterAll(test_mongodb.teardown);
const User = require("../schemas/User");
const Project = require("../schemas/Project");

async function addFakeProj() {
  const user1 = new User({
    name: "paulo",
    email: "paulo@example.com"
  });
  let u1 = await user1.save();

  const proj1 = new Project({
    name: "Pizza Delivery",
    client: "OnePizza",
    main_tw_contact: `${u1.id}`,
    contact: 999
  });
  let p = await proj1.save();
}

beforeEach(async () => {
  // Clean DB between test runs
  mongoose.connection.db.dropDatabase();
});

describe("Project model", () => {
  it("fields defined in the project schema can be saved", async () => {
    await addFakeProj();
    let proj = await Project.findOne({ name: "Pizza Delivery" }).populate(
      "main_tw_contact",
      "name"
    );
    expect(proj.client).toBe("OnePizza");
    expect(proj.main_tw_contact.name).toBe("paulo");
  });

  it("fields not defined in the project schema cannot be saved", async () => {
    await addFakeProj();
    let proj = await Project.findOne({ name: "Pizza Delivery" });
    expect(proj.phone).toBeUndefined();
  });

  it("can be searched by _id", async () => {
    await addFakeProj();
    let proj = await Project.findOne({ name: "Pizza Delivery" });
    let searchResult = await Project.findById(proj._id);
    expect(searchResult.name).toEqual("Pizza Delivery");
    expect(searchResult.client).toEqual("OnePizza");
  });
});
