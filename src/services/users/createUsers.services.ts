import { client } from "../../database";
import format from "pg-format";
import { iUserRequest, iUserResult } from "../../interfaces/users.interface";
import { AppError } from "../../error";
import { QueryConfig } from "pg";
import { hash } from "bcryptjs";

const createUser = async (userData: iUserRequest) => {
    const queryStringVerifyEmail: string = `
    SELECT * FROM 
        users u 
    WHERE 
        email = $1
    `;
    const queryConfigVerifyEmail: QueryConfig = {
        text: queryStringVerifyEmail,
        values: [userData.email],
    };
    const QueryResultVerifyEmail = await client.query(queryConfigVerifyEmail);
    if (QueryResultVerifyEmail.rowCount > 0) {
        throw new AppError("E-mail already exists", 409);
    }

    const hashedPassword = await hash(userData.password, 10);

    const newUser: iUserRequest = {
        ...userData,
        password: hashedPassword,
    };

    const queryString: string = format(
        `
    INSERT INTO 
        users (%I)
    VALUES
        (%L)
    RETURNING id, name, email, admin, active;
    `,
        Object.keys(newUser),
        Object.values(newUser)
    );
    const QueryResult: iUserResult = await client.query(queryString);

    return QueryResult.rows[0];
};

export { createUser };
