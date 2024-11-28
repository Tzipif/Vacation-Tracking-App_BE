import { Router, NextFunction, Request, Response } from "express";
import { appConfig } from "../utils/appConfig";
import UserModel from "../models/userModel";
import { createUser, userLogIn } from "../services/userServices";
import { StatusCode } from "../models/statusEnum";

export const userRouters = Router();

userRouters.post(appConfig.routePrefix + '/register', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = new UserModel(req.body);
        const token = await createUser(user);
        res.status(StatusCode.Ok).json({token});
    } catch (error) {
        next(error);
    }
})

userRouters.post(appConfig.routePrefix + '/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        
        const token = await userLogIn(email, password);
        res.status(StatusCode.Ok).json(token);
    } catch (error) {
        next(error);
    }
})