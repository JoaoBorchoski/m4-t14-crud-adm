import { Router } from "express";
import { userLogin } from "../controllers/login.controllers";
import { ensureDataIsValidMiddleware } from "../middlewares";
import { loginUserSchema } from "../schemas/users.schemas";

const loginRouter: Router = Router();

loginRouter.post("", ensureDataIsValidMiddleware(loginUserSchema), userLogin);

export { loginRouter };
