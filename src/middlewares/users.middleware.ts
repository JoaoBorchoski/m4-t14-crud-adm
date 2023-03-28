import { Request, Response, NextFunction } from "express";
import { QueryConfig } from "pg";
import { client } from "../database";
import { iUserRequest } from "../interfaces/users.interface";

const verifyRequiredKeysNewUser = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    const validKeys: Array<string> = [
        "active",
        "admin",
        "email",
        "name",
        "password",
    ];
    const keys: Array<string> = Object.keys(req.body);

    const allValid: boolean = keys.every((key: string) => {
        return validKeys.includes(key);
    });
    if (!allValid) {
        return res.status(400).json({
            massage: `Required keys are: ${validKeys}`,
        });
    }

    return next();
};

const verifyEmailExists = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    const user: iUserRequest = req.body;

    const queryString: string = `
    SELECT * FROM 
        users u 
    WHERE 
        email = $1
    `;
    const queryConfig: QueryConfig = {
        text: queryString,
        values: [user.email],
    };
    const QueryResult = await client.query(queryConfig);

    if (QueryResult.rowCount > 0) {
        return res.status(400).json({
            massage: "E-mail already registered",
        });
    }

    return next();
};

export { verifyRequiredKeysNewUser, verifyEmailExists };
