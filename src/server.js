import express from "express";
import cors from "cors";
import { env } from "./utils/env.js";
import contactsRouter from "./routers/contacts.js";
import {notFoundHandler} from "./middlewares/notFoundHandler.js";
import {errorHandler} from "./middlewares/errorHandler.js";
import {logger} from "./middlewares/logger.js";

export const setupServer = ()=> {
    const app = express();

    app.use(cors());
    app.use(express.json());

    app.use(logger);

    app.use("/contacts", contactsRouter);

app.get("/", (_, res)=> {
        res.json({
            message: "Start project"
        })
    });

    app.use(notFoundHandler);

    app.use(errorHandler);

    const port = Number(env("PORT", 3000));

    app.listen(port, ()=> console.log(`Server running on ${port} PORT`));
}
