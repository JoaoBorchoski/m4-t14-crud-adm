import { Request, Response } from "express";
import { createLoginService } from "../services/index";

const userLogin = async (req: Request, res: Response): Promise<Response> => {
    const token = await createLoginService(req.body);

    return res.json(token);
};

export { userLogin };
