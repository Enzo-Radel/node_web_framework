import express, { Express } from 'express';
import dotenv from 'dotenv';
import { exampleRouter } from "./routes/example";
import { userRouter } from "./routes/userRouter";

dotenv.config();

const app: Express = express();

app.set('view engine', 'ejs');
app.set('views', './src/views');

const port = process.env.PORT;

app.use("/", exampleRouter);
app.use("/user", userRouter);

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
