import express from "express";
import cors from "cors";
import { env } from "./utils/env.js";
import contactsRouter from "./routers/contacts.js";
import {notFoundHandler} from "./middlewares/notFoundHandler.js";
import {errorHandler} from "./middlewares/errorHandler.js";
import {logger} from "./middlewares/logger.js";
import authRouter from "./routers/auth.js";
import cookieParser from "cookie-parser";
import {initMongoDB} from './db/initMongoConnection'
import { createDirIfNotExists } from "./utils/createDirIfNotExists.js";
import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from "./constants/index.js";

export const setupServer = ()=> {
    const app = express();

    app.use(cors());
    app.use(express.json());
    app.use(cookieParser());
    app.use(logger);

    app.use("/auth", authRouter);
    app.use("/contacts", contactsRouter);

app.get("/", (_, res)=> {
        res.json({
            message: "Start project"
        })
    });

    app.use(notFoundHandler);

    app.use(errorHandler);

    const bootstrap = async () => {
        await initMongoDB();
        await createDirIfNotExists(TEMP_UPLOAD_DIR);
        await createDirIfNotExists(UPLOAD_DIR);
        startServer();
    };

    void bootstrap();

    const port = Number(env("PORT", 3000));

    app.listen(port, ()=> console.log(`Server running on ${port} PORT`));
}


