import * as contactServices from "../services/contacts.js";
import createHttpError from "http-errors";

export const getContactsController = async (_, res) => {
    // try {
        const data = await contactServices.getContacts();

        res.json({
            status: 200,
            message: "Successfully found contacts!",
            data,
        })
    // }
    // catch (error) {
        // next(error);
        // res.status(500).json({
        //     status: 500,
        //     message: error.message
        // })
    // }
}

export const getContactByIdController = async (req, res) => {
    // try {
        const { contactId } = req.params;
        const data = await contactServices.getContactById(contactId);

        if (!data) {
            throw createHttpError(404, 'Contact not found');
            // const error = new Error('Contact not found');
            // error.status = 404;
            // throw error;
            // return res.status(404).json({
            //     message: 'Contact not found',
            // })
        }

        res.json({
            status: 200,
            message: `"Successfully found contact with id ${contactId}!"`,
            data,
        })
    // }
    // catch (error) {
        // next(error);
        // const { status = 500, message = "Server error" } = error;
        // res.status(status).json({
        //     status,
        //     message,
        // })
    // }
}

export const addContactController = async (req, res) => {
    const data = await contactServices.addContact(req.body);

    res.status(201).json({
        status: 201,
        message: "Contact successfullt add",
        data,
    });
}

export const upsertContactController = async (req, res) => {
    const { contactId: _id } = req.params;

    const data = await contactServices.updateContact({ _id, payload: req.body });

    res.json({
        status: 200,
        message: "Contact updated successfully",
        data,
    })
}
// export const upsertStudentController = async (req, res) => {
//   const { studentId } = req.params;
// };
