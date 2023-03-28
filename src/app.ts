import "express-async-errors";
import express, { Application } from "express";
import { handleErrors } from "./error";
import { usersRouter } from "./routes/users.router";
import { loginRouter } from "./routes/login.routes";

const app: Application = express();
app.use(express.json());

app.use("/users", usersRouter);
app.use("/login", loginRouter);

app.use(handleErrors);

export default app;
