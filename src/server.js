import express from "express";
import cors from "cors";
// import pino from "pino-http";
import { env } from "./utils/env.js";
// import * as contactServices from "./services/contacts.js";
import contactsRouter from "./routers/contacts.js";
import {notFoundHandler} from "./middlewares/notFoundHandler.js";
import {errorHandler} from "./middlewares/errorHandler.js";
import {logger} from "./middlewares/logger.js";

export const setupServer = ()=> {
    const app = express();

    app.use(cors());
    // const logger = pino({
    //     transport: {
    //         target: "pino-pretty"
    //     }
    // });
    app.use(logger);

    app.use("/contacts", contactsRouter);

app.get("/", (_, res)=> {
        res.json({
            message: "Start project"
        })
    });

    // app.get("/contacts", async (_, res) => {
    //     const data = await contactServices.getContacts();

    //     res.json({
    //         status: 200,
    //         message: "Successfully found contacts!",
    //         data,
    //     })
    // });

    // app.get("/contacts/:contactId", async (req, res) => {
    //     const { contactId } = req.params;
    //     const data = await contactServices.getContactById(contactId);

    //     if (!data) {
    //         return res.status(404).json({
    //             message: 'Contact not found',
    //         })
    //     }

    //     res.json({
    //         status: 200,
    //         message: `"Successfully found contact with id ${contactId}!"`,
    //         data,
    //     })
    // })

    app.use(notFoundHandler);

    app.use(errorHandler);

    const port = Number(env("PORT", 3000));

    app.listen(port, ()=> console.log(`Server running on ${port} PORT`));
}
