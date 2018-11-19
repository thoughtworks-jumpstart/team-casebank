const app = require("../app");
const request = require("supertest");

describe.skip("routes/api", () => {
  it("GET /api/test should return hello world", () => {
    return request(app)
      .get("/cases/test")

      .then(response => {
        expect(response.status).toEqual(200);
        expect(response.body).toEqual({
          message: "Welcome to casebank project"
        });
      });
  });
});
