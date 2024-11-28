import { options } from "joi";
import UserModel from "../models/userModel";
import jwt from "jsonwebtoken";
import { appConfig } from "./appConfig";
import { AppExcption, UnauthorizedError } from "../models/exceptions";

export function createToken(user: UserModel): string {
    const userWithoutPsw = { ...user };
    delete userWithoutPsw.password;

    const options = {};
    const token = jwt.sign({ user: userWithoutPsw, role: user.role }, appConfig.jwtSecret, options);

    return token;
}

export function verifyToken(token: string, adminReq: boolean = false) {
    if (!token) {
        throw new UnauthorizedError('Missing credentials!');
    }

    try {
        const res = jwt.verify(token, appConfig.jwtSecret) as { user: UserModel; role: string };
        if (adminReq && res.role !== 'admin') {
            throw new UnauthorizedError('Only for admin role');
        }
        return res.user;
    } catch (error) {
        if (error instanceof AppExcption) {
            throw error;
        }
        throw new UnauthorizedError('Wrong credentials');
    }
}