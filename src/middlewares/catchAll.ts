import { NextFunction, Request, Response } from "express";
import { AppExcption } from "../models/exceptions";
import { StatusCode } from "../models/statusEnum";

export default function catchAll(err:any, req:Request, res:Response, next:NextFunction, ) {
    if (err instanceof AppExcption){
        res.status(err.status).send(err.message);
        return
    }
    res.status(StatusCode.ServerError).send("Internal Server Error")
}