import { Router } from "express";
// import * as contactServices from "../services/contacts.js";
import * as contactControllers from "../controllers/contacts.js";
import ctrlWrapper from "../utils/ctrlWrapper.js";

const contactsRouter = Router();

// contactsRouter.get("/", (_, res) => {
//         res.json({
//             message: "Start project"
//         })
//     });

contactsRouter.get("/", ctrlWrapper(contactControllers.getContactsController));

contactsRouter.get("/:contactId", ctrlWrapper(contactControllers.getContactByIdController));

export default contactsRouter;
