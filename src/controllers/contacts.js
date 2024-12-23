import * as contactServices from "../services/contacts.js";
import createHttpError from "http-errors";
import { parsePaginationParams } from "../utils/parsePaginationParams.js";
import { parseSortParams } from "../utils/parseSortParams.js";
import { sortByList } from "../db/models/Contact.js";
import { parseContactFilter } from "../utils/parseContactFilter.js";
import { saveFileToCloudinary } from "../utils/saveFileToCloudinary.js";
import { env } from "../utils/env.js";

export const getContactsController = async (req, res) => {
    const { page, perPage } = parsePaginationParams(req.query);
    const { sortBy, sortOrder } = parseSortParams(req.query, sortByList);
    const filter = parseContactFilter(req.query);
    const data = await contactServices.getContacts({page, perPage, sortBy, sortOrder, filter});
    const {_id: userId} = req.user;
    filter.userId = userId;

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
    const {_id: userId} = req.user;
    const data = await contactServices.addContact(...req.body, userId);

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

export const patchContactControllers = async (req, res, next) => {
    const { contactId } = req.params;
    const photo = req.file;

    let photoURL;

    if (photo) {
        if (env('ENABLE_CLOUdinary') === 'true') {
            photoUrl = await saveFileToCloudinary(photo);
        } else {
            photoUrl = await saveFileToCloudinary(photo);
        }
    }

    const result = await contactServices.updateContact(contactId, {
        ...req.body,
        photo: photoUrl,
    });

    if (!result) {
        next(createHttpError(404, 'Contact not found'));
        return;
    }

    res.json({
        ststus: 200,
        message: 'Successfully patched a contact!',
        data: result.student,
    });

    // const { contactId: _id } = req.params;
    // const result = await contactServices.updateContact({ _id, payload: req.body });
    // if (!result) {
    //     throw createHttpError(404, "Contact not found");
    // }
    // res.json({
    //     status: 200,
    //     message: "Successffully patched a contact!",
    //     data: result.data,
    // });
};

export const deleteContactControllers = async (req, res) => {
    const { contactId: _id } = req.params;
    const data = await contactServices.deleteContact({ _id });
    if (!data) {
        throw createHttpError(404, "Contact not found");
    }
    res.status(204).send();
}

// export const
