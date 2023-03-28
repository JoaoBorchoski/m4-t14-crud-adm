import { Request, Response } from "express";
import {
    createUser,
    getUsers,
    softDeleteUser,
    getUnicUser,
    activeUserPut,
} from "../services";
import { iUserRequest } from "../interfaces/users.interface";
import { updateUserService } from "../services/users/updateUser.services";

const createUserController = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const userData: iUserRequest = req.body;
    const newUser = await createUser(userData);

    return res.status(201).json(newUser);
};

const getAllUsers = async (req: Request, res: Response): Promise<Response> => {
    const token = req.headers.authorization;
    const users = await getUsers(token!);

    return res.status(200).json(users);
};

const deleteUser = async (req: Request, res: Response): Promise<Response> => {
    const id = +req.params.id;
    const token = req.headers.authorization;
    const deleteUser = await softDeleteUser(id, token!);

    return res.status(204).send();
};

const getUser = async (req: Request, res: Response): Promise<Response> => {
    const authToken = req.headers.authorization;
    const user = await getUnicUser(authToken!);

    return res.json(user);
};

const updateUserController = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const userData = req.body;
    const id: number = +req.params.id;
    const token = req.headers.authorization;
    const updateUser = await updateUserService(userData, id, token);

    return res.json(updateUser);
};

const activeUserController = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const authToken = req.headers.authorization!;
    const id: number = +req.params.id;

    const userActive = await activeUserPut(authToken, id);

    return res.json(userActive);
};

export {
    createUserController,
    getAllUsers,
    deleteUser,
    getUser,
    updateUserController,
    activeUserController,
};
