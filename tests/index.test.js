import jest from "jest";
import app from "../src/app.js";
import request from "supertest";

describe("Get Task", () => {
  test("should respond with a 200 status code", async () => {
    const response = await request(app).get("/tasks").send();
    expect(response.statusCode).toBe(200);
  });

  test("should respond with a array", async () => {
    const response = await request(app).get("/tasks").send();
    expect(response.body).toBeInstanceOf(Array);
  });
});

describe("POST /tasks", () => {

  describe("When req contain title and description", () => {

    const body = {
      title: "test Title",
      description: "test Description"
    }

    // should repsond with a 200 status code

    test("should responde with a 200 status code", async () => {
      const response = await request(app).post("/tasks").send(body);
      expect(response.statusCode).toBe(200);
    });

    // should respond with a content-type of application/json

    test("should respond with a content-type of application/json", async () => {
      const response = await request(app).post("/tasks").send(body);
      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
    });

    // should respond with a json object containing the new task with on id

    test("should respond with a task ID", async () => {
      const response = await request(app).post("/tasks").send(body);
      expect(response.body.id).toBeDefined();
    });
  });

  describe('When title or description does not exist', () => {
    test('should return 400 when title or description does not exist', async() => {
        const fields = [
            {},
            {title: "test Title"},
            {description: "test Description"}
        ];
        
        for(const body of fields) {
            const response = await request(app).post("/tasks").send(body);
            expect(response.statusCode).toBe(400);
        }
     })
  })
});
