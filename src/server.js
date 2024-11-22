import express from "express";
import cors from "cors";
import pino from "pino-http";
import { env } from "./utils/env.js";
import * as contactServices from "./services/contacts.js";

export const setupServer = ()=> {
    const app = express();

    app.use(cors());
    const logger = pino({
        transport: {
            target: "pino-pretty"
        }
    });
    app.use(logger);

    app.get("/", (_, res)=> {
        res.json({
            message: "Start project"
        })
    });

    app.get("/contacts", async (_, res) => {
        const data = await contactServices.getContacts();

        res.json({
            status: 200,
            message: "Successfully found contacts!",
            data,
        })
    });

    app.get("/contacts/:contactId", async (req, res) => {
        const { contactId } = req.params;
        const data = await contactServices.getContactById(contactId);

        if (!data) {
            return res.status(404).json({
                message: 'Contact not found',
            })
        }

        res.json({
            status: 200,
            message: "Successfully found contact with id {contactId}!",
            data,
        })
    })

    app.use((req, res)=> {
        res.status(404).json({
            message: `${req.url} not found`
        })
    });

    app.use((error, _, res)=> {
        res.status(500).json({
            message: error.message,
        })
    });

    const port = Number(env("PORT", 3000));

    app.listen(port, ()=> console.log(`Server running on ${port} PORT`));
}
