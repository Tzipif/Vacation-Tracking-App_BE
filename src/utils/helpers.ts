import { UploadedFile } from "express-fileupload";
import path from "path";
import { v4 as uuid } from "uuid";
import { appConfig } from "./appConfig";

export async function saveImage(image: UploadedFile) {
    const extention = image.name.substring(image.name.lastIndexOf('.'));
    const fileName = uuid() + extention;
    const fullPath = path.join(appConfig.vocatinImagePrefix, fileName);
    await image.mv(fullPath);

    return fileName
};