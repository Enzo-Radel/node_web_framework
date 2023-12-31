import express, { Express } from 'express';
import dotenv from 'dotenv';
import { exampleRouter } from "./routes/example";
import { userRouter } from "./routes/userRouter";

dotenv.config();

const app: Express = express();

app.set('view engine', 'ejs');
app.set('views', './src/views');

app.use(express.json())

const port = process.env.PORT;

app.use("/", exampleRouter);
app.use("/user", userRouter);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
