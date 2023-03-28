import { Router } from "express";
import {
    activeUserController,
    createUserController,
    deleteUser,
    getAllUsers,
    getUser,
    updateUserController,
} from "../controllers/users.controllers";

import { createUserSchema, updateUserSchema } from "../schemas/users.schemas";

import { ensureDataIsValidMiddleware } from "../middlewares";
import { verifyPermissionLevel } from "../middlewares/verifyPermission.middlewares";
import { verifyId } from "../middlewares/verifyId.middlewares";

const usersRouter: Router = Router();

usersRouter.post(
    "",
    ensureDataIsValidMiddleware(createUserSchema),
    createUserController
);
usersRouter.get("", verifyPermissionLevel, getAllUsers);
usersRouter.get("/profile", getUser);
usersRouter.delete("/:id", verifyPermissionLevel, deleteUser);
usersRouter.patch(
    "/:id",
    ensureDataIsValidMiddleware(updateUserSchema),
    verifyId,
    updateUserController
);
usersRouter.put("/:id/recover", verifyPermissionLevel, activeUserController);

export { usersRouter };
