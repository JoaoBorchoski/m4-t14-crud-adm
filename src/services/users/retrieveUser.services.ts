import { QueryConfig } from "pg";
import { verify } from "jsonwebtoken";
import { client } from "../../database";
import { AppError } from "../../error";

const getUnicUser = async (authToken: string) => {
    if (!authToken || authToken == "Bearer undefined") {
        throw new AppError("Missing authorization token", 401);
    }
    const token: string = authToken.split(" ")[1];

    return verify(
        token,
        String(process.env.SECRET_KEY),
        async (error: any, decoded: any) => {
            if (error) throw new AppError(error.message, 401);

            const queryString: string = `
                SELECT 
                    u.id, u.name, u.email, u.admin, u.active 
                FROM 
                    users u
                WHERE 
                    email = $1
                ;
            `;
            const queryConfig: QueryConfig = {
                text: queryString,
                values: [decoded.email],
            };
            const queryResult = await client.query(queryConfig);

            return queryResult.rows[0];
        }
    );
};

export { getUnicUser };
