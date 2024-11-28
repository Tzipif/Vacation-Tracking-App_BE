import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/authHelpers";

export function verifyTokenMW (req: Request, res: Response, next: NextFunction) {

    try {
        const token = req.header("Authorization")?.substring(7) || "";        
        const user = verifyToken(token);

        res.locals.user = user;
        next()
    } catch (error) {
        next(error);
    }
}

export function verifyTokenAdminMW(req: Request, res: Response, next: NextFunction) {
    try {
        
        console.log(req.header("Authorization"));
        const token = req.header("Authorization")?.substring(7) || "";
        console.log(token);
        
        const user = verifyToken(token, true);

        console.log('Decoded user:', user);
        console.log(res.locals.user);
        res.locals.user = user;
        next()
    } catch (error) {
        next(error);
    }
}