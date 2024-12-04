import * as contactServices from "../services/contacts.js";
import createHttpError from "http-errors";
import { parsePaginationParams } from "../utils/parsePaginationParams.js";
import { parseSortParams } from "../utils/parseSortParams.js";
import { sortByList } from "../db/models/Contact.js";
import { parseContactFilter } from "../utils/parseContactFilter.js";

export const getContactsController = async (req, res) => {
    const { page, perPage } = parsePaginationParams(req.query);
    const { sortBy, sortOrder } = parseSortParams(req.query, sortByList);
    const filter = parseContactFilter(req.query);
    const data = await contactServices.getContacts({page, perPage, sortBy, sortOrder, filter});

    res.json({
        status: 200,
        message: "Successfully found contacts!",
        data,
    })
}

export const getContactByIdController = async (req, res) => {
    const { contactId } = req.params;
    const data = await contactServices.getContactById(contactId);

    if (!data) {
        throw createHttpError(404, 'Contact not found');
    }

    res.json({
        status: 200,
        message: `Successfully found contact with id ${contactId}!`,
        data,
    })
}

export const addContactController = async (req, res) => {
    const data = await contactServices.addContact(req.body);

    res.status(201).json({
        status: 201,
        message: "Contact successfully add",
        data,
    });
}

export const upsertContactController = async (req, res) => {
    const { contactId: _id } = req.params;
    const result = await contactServices.updateContact({
        _id, payload: req.body, options: {
            upsert: true
        }
    });
    const status = result.isNew ? 201 : 200;
    res.status(status).json({
        status,
        message: "Contact upserted.",
        data: result.data,
    })
}

export const patchContactControllers = async (req, res) => {
    const { contactId: _id } = req.params;
    const result = await contactServices.updateContact({ _id, payload: req.body });
    if (!result) {
        throw createHttpError(404, "Contact not found");
    }
    res.json({
        status: 200,
        message: "Successffully patched a contact!",
        data: result.data,
    });
};

export const deleteContactControllers = async (req, res) => {
    const { contactId: _id } = req.params;
    const data = await contactServices.deleteContact({ _id });
    if (!data) {
        throw createHttpError(404, "Contact not found");
    }
    res.status(204).send();
}

