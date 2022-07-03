import Express from "express";
import morgan from "morgan";
import {v4} from "uuid"

const app = Express();

app.use(morgan("dev"));
app.use(Express.json());

app.get("/", (req, res) => {
    console.log("Holis");
    res.send("Página principal");
})

app.get("/tasks", (req, res) => {
    res.status(200).json([])
})

app.post("/tasks", (req, res) => {
    const {title, description} = req.body;
    const id = v4();
    res.json({
        id,
        title,
        description
    });
})

export default app;