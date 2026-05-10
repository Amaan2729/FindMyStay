process.env.DISABLE_BACKEND_ROUTES = "true";
const request = require("supertest");
const app = require("../app");

describe("Backend integration", () => {
  it("responds to GET /", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.text).toContain("Backend working");
  });
});
