import { QueryConfig } from "pg";
import { Request, Response, NextFunction } from "express";
import { client } from "../database";
import { AppError } from "../error";
import { verify } from "jsonwebtoken";

const verifyPermissionLevel = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authToken = req.headers.authorization!;

    if (!authToken || authToken == "Bearer undefined") {
        throw new AppError("Missing authorization token", 401);
    }
    const token: string = authToken.split(" ")[1];

    return verify(
        token,
        String(process.env.SECRET_KEY),
        async (error: any, decoded: any) => {
            if (error) throw new AppError(error.message, 401);

            if (decoded.admin == false) {
                throw new AppError("Insufficient Permission", 401);
            }

            req.user = {
                id: decoded.subject,
                admin: decoded.admin,
            };

            return next();
        }
    );
};

export { verifyPermissionLevel };
