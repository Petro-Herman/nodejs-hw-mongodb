import { Router } from "express";
import * as contactControllers from "../controllers/contacts.js";
import ctrlWrapper from "../utils/ctrlWrapper.js";

const contactsRouter = Router();


contactsRouter.get("/", ctrlWrapper(contactControllers.getContactsController));

contactsRouter.get("/:contactId", ctrlWrapper(contactControllers.getContactByIdController));

contactsRouter.post("/", ctrlWrapper(contactControllers.addContactController))

contactsRouter.put("/:contactId", ctrlWrapper(contactControllers.upsertContactController));

contactsRouter.patch("/:contactId", ctrlWrapper(contactControllers.patchContactControllers));

contactsRouter.delete("/:contactId", ctrlWrapper(contactControllers.deleteContactControllers));


export default contactsRouter;
