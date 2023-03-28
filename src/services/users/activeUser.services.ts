import { QueryConfig } from "pg";
import { client } from "../../database";
import { AppError } from "../../error";
import { iUserResult } from "../../interfaces/users.interface";

const activeUserPut = async (authToken: string, id: number) => {
    if (!authToken || authToken == "Bearer undefined") {
        throw new AppError("Missing authorization token", 401);
    }

    const queryStringVerifyId: string = `
    SELECT * FROM 
        users u 
    WHERE 
        id = $1;
    `;
    const queryConfigVerifyId: QueryConfig = {
        text: queryStringVerifyId,
        values: [id],
    };
    const QueryResultVerifyId = await client.query(queryConfigVerifyId);
    if (QueryResultVerifyId.rowCount === 0) {
        throw new AppError("Id not Found", 400);
    }

    const queyString: string = `   
    UPDATE 
        users 
    SET 
        active = TRUE 
    WHERE 
        id = $1
    RETURNING id, name, email, admin, active;
    `;
    const queryConfig: QueryConfig = {
        text: queyString,
        values: [id],
    };
    const queryResult: iUserResult = await client.query(queryConfig);

    return queryResult.rows[0];
};

export { activeUserPut };
