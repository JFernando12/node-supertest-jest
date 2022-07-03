import jest from 'jest';
import app from '../src/app.js';
import request from 'supertest';

describe("Get Task", () => {
    test('should respond with a 200 status code', async() => { 
        const response = await request(app).get("/tasks").send();
        expect(response.statusCode).toBe(200);
    })

    test('should respond with a array', async() => { 
        const response = await request(app).get("/tasks").send();
        expect(response.body).toBeInstanceOf(Array);
     })
})

describe('POST /tasks', () => {
    // should repsond with a 200 status code

    test('should responde with a 200 status code', async() => {
        const response = await request(app).post("/tasks").send();
        expect(response.statusCode).toBe(200);
    })    

    // should respond with a content-type of application/json

    test('should respond with a content-type of application/json', async() => { 
        const response = await request(app).post("/tasks").send();
        expect(response.headers["content-type"]).toEqual(
            expect.stringContaining("json")
        );
     });

    // should respond with a json object containing the new task with on id

    test('should respond with a task ID', async() => {
        const response = await request(app).post("/tasks").send({
            title: "test Title",
            description: "test Description"
        });
        expect(response.body.id).toBeDefined();
    })
})