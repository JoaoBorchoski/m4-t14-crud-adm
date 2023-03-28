import { QueryResult } from "pg";

interface iUserRequest {
    name: string;
    email: string;
    password: string;
    admin?: boolean;
    active?: boolean;
}

interface iUser extends iUserRequest {
    id: number;
}

interface iUserLoginRequest {
    email: string;
    password: string;
}

interface iToken {
    token: string;
}

type iUserOmitPassword = Omit<iUser, "password">;
type iUserResult = QueryResult<iUserOmitPassword>;
type requiredKeysNewUser = "name" | "email" | "password" | "admin" | "active";

export type {
    iUserRequest,
    iUser,
    iUserLoginRequest,
    iToken,
    iUserOmitPassword,
    iUserResult,
    requiredKeysNewUser,
};
