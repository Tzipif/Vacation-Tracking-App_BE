import { NextFunction, Request, Response } from "express";
import { appConfig } from "../utils/appConfig";
import { StatusCode } from "../models/statusEnum";

export function doorman(req:Request, res: Response, next: NextFunction) {
    if (req.header("doormanKey") !== appConfig.doormanKey) {
        res.status(StatusCode.Unauthorized).send("");
        return;
    }
    else {
        res.status(StatusCode.Ok).send('The loged succed');
    }
    
    next();
}