import client from "../../database/config";
import { AppError } from "../../error";

const getUsers = async (authToken: string) => {
    console.log(authToken);
    if (!authToken || authToken == "Bearer undefined") {
        throw new AppError("Missing authorization token", 401);
    }

    const queryString: string = `
    SELECT u.id, u.name, u.email, u.admin, u.active FROM users u;
    `;
    const queryResult = await client.query(queryString);

    return queryResult.rows;
};

export { getUsers };
