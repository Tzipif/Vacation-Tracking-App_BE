import express, { Request, Response } from "express"
import { vacationRouters } from "./controllers/vacationControllers";
import { appConfig } from "./utils/appConfig";
import cors from "cors";
import path from "path";
import catchAll from "./middlewares/catchAll";
import { userRouters } from "./controllers/userControllers";
import { followingRouters } from "./controllers/followingControllers";
import fileUpload from "express-fileupload";

const server = express();

// server.use(doorman);

// load body
server.use(express.json());
server.use(cors());
server.use(fileUpload());

server.use('/', vacationRouters);
server.use('/', userRouters);
server.use('/', followingRouters);

server.use(catchAll)

server.use('/assets/images', express.static(path.join(__dirname, 'assets', 'images')));


server.listen(appConfig.port, ()=>{console.log(`Listening on http://localhost:${appConfig.port}`);
console.log('app Up');
})