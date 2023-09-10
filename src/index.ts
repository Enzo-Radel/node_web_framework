import express, { Express } from 'express';
import dotenv from 'dotenv';
import { exampleRouter } from "./routes/example";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use("/", exampleRouter);

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
