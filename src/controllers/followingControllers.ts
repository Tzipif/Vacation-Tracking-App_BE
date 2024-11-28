import { Router, NextFunction, Request, Response } from "express";
import { appConfig } from "../utils/appConfig";
import { StatusCode } from "../models/statusEnum";
import { addFollowing, isFollowingService, removeFollowing } from "../services/followerServices";

export const followingRouters = Router();

followingRouters.post(appConfig.routePrefix + '/add-following', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user_id = +req.body.user_id;
        const vacation_id = +req.body.vacation_id;

        await addFollowing(user_id, vacation_id);

        res.status(StatusCode.Ok).json('succes add following');

    } catch (error) {
        next(error)
    }
})

followingRouters.delete(appConfig.routePrefix + '/remove-following', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user_id = +req.query.user_id;
        const vacation_id = +req.query.vacation_id;

        await removeFollowing(user_id, vacation_id);

        res.status(StatusCode.Ok).json('success remove following');

    } catch (error) {
        next(error);
    }
});

followingRouters.get(appConfig.routePrefix + '/following/:u_id/:v_id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user_id = +req.params.u_id;
        const vacation_id = +req.params.v_id;

        const isFollowing = await isFollowingService(user_id, vacation_id);

        if (isFollowing) {
            res.status(StatusCode.Ok).send(true);
        } else {
            res.status(StatusCode.Ok).json(false);
        }

    } catch (error) {
        next(error);
    }
});