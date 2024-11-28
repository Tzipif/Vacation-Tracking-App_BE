import { Router, NextFunction, Request, Response } from "express";
import { appConfig } from "../utils/appConfig";
import { countVacations, createNewVacation, deleteVacation, downloadReport, getAllVacations, updateVacation } from "../services/vacationServices";
import { StatusCode } from "../models/statusEnum";
import { verifyTokenAdminMW, verifyTokenMW } from "../middlewares/authMiddleware";
import VacationModel from "../models/vacationModel";
import { UploadedFile } from "express-fileupload";
import { saveImage } from "../utils/helpers";
import path from "path";

export const vacationRouters = Router();

vacationRouters.get(appConfig.routePrefix + '/vacations-count', verifyTokenMW,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user_id = +req.query.userId;
            const filters = {
                userId: user_id,
                active: req.query.active === 'true',
                notStarted: req.query.notStarted === 'true',
                following: req.query.following === 'true',
            };

            const total = await countVacations(filters);

            res.status(StatusCode.Ok).json(total);
        } catch (error) {
            next(error)
        }
    });

vacationRouters.get(appConfig.routePrefix + '/vacations', verifyTokenMW,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const page = +req.query.page || 0;
            const limit = +req.query.limit || 10;
            const user_id = +req.query.userId;
            const vacation_id = +req.query.vacationId;
            const filters = {
                userId: user_id,
                vacationId: vacation_id,
                active: req.query.active === 'true',
                notStarted: req.query.notStarted === 'true',
                following: req.query.following === 'true',
            };

            const vacations = await getAllVacations(page as number, limit as number, filters);

            res.status(StatusCode.Ok).json(vacations);
        } catch (error) {
            next(error)
        }
    });

vacationRouters.delete(appConfig.routePrefix + '/vacations/:vacation_id', verifyTokenAdminMW, async (req: Request, res: Response, next: NextFunction) => {
    console.log("Authorization header:", req.header("Authorization"));
    try {
        const vacationId = +req.params.vacation_id;
        const vacationDelete = await deleteVacation(vacationId);
        res.status(StatusCode.Ok).json(vacationDelete)
    } catch (error) {
        next(error)
    }
})

vacationRouters.post(appConfig.routePrefix + '/create-vacation', verifyTokenAdminMW, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const file = req.files?.imageFile;
        if (!file) {
            return res.status(StatusCode.NotFound).send('No files were uploaded.');
        }

        const vacation = new VacationModel(req.body);

        const uploadImage = await saveImage(file as UploadedFile);
        if (uploadImage) {
            vacation.url_image = uploadImage;
            const newVacation = await createNewVacation(vacation);
        }

        res.status(StatusCode.Ok).send('Vacation created successfully');

    } catch (error) {
        next(error)
    }
});

vacationRouters.put(appConfig.routePrefix + '/edit-vacation/:id', verifyTokenAdminMW, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const file = req.files?.imageFile;
        console.log(file);

        const vid = +req.params.id;
        console.log(vid);

        const vacation = new VacationModel(req.body);

        if (file) {
            const uploadImage = await saveImage(file as UploadedFile);
            if (uploadImage) {
                vacation.url_image = uploadImage;
            }
        } else if (req.body.url_image) {
            vacation.url_image = req.body.url_image;
        }

        await updateVacation(vacation, vid);

        res.status(StatusCode.Ok).send('Vacation edited successfully');

    } catch (error) {
        next(error)
    }
});

vacationRouters.get(appConfig.routePrefix + '/download-report', verifyTokenAdminMW, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const csvData = await downloadReport();

        res.header('Content-Type', 'text/csv');
        res.attachment('vacation report.csv');

        res.status(201).send(csvData);
    } catch (error) {
        next(error)
    }
});