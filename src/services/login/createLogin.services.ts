import { sign } from "jsonwebtoken";
import { compare } from "bcryptjs";
import { iUserLoginRequest } from "../../interfaces/users.interface";
import { QueryConfig } from "pg";
import client from "../../database/config";
import { AppError } from "../../error";

const createLoginService = async (
    userData: iUserLoginRequest
): Promise<any> => {
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
    const user = QueryResultVerifyEmail.rows[0];

    if (QueryResultVerifyEmail.rowCount === 0) {
        throw new AppError("Invalid email or password!", 401);
    }

    const pwdMatch: boolean = await compare(userData.password, user.password);
    if (!pwdMatch) {
        throw new AppError("Invalid email or password!", 401);
    }
    const token: string = sign(
        { email: user.email, admin: user.admin },
        String(process.env.SECRET_KEY),
        { expiresIn: "24h", subject: String(user.id) }
    );

    return { token };
};

export { createLoginService };
