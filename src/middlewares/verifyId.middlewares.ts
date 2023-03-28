import { NextFunction, Request, Response } from "express";
import { QueryConfig } from "pg";
import { client } from "../database";
import { AppError } from "../error";

const verifyId = async (req: Request, res: Response, next: NextFunction) => {
    const queryStringVerifyId: string = `
    SELECT * FROM 
        users u 
    WHERE 
        id = $1;
    `;
    const queryConfigVerifyId: QueryConfig = {
        text: queryStringVerifyId,
        values: [+req.params.id],
    };
    const QueryResultVerifyId = await client.query(queryConfigVerifyId);
    if (QueryResultVerifyId.rowCount === 0) {
        throw new AppError("Id not Found", 404);
    }

    return next();
};

export { verifyId };
