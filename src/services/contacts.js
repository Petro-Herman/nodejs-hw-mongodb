import ContactCollection from "../db/models/Contact.js";

export const getContacts = () => ContactCollection.find();

export const getContactById = contactId => ContactCollection.findById(contactId);

export const addContact = payload => ContactCollection.create(payload);

export const updateContact = async ({ _id, payload, options = {} }) => {
    const data = await ContactCollection.findByIdAndUpdate({ _id }, payload, {
        ...options,
        new: true,
        includeResultMetadata: true,
    });
    if (!data || !data.value) {
        return null;
    }
    return {
        data: data.value,
        isNew: Boolean(data.lastErrorObject.upserted),
    };
};

export const deleteContact = async filter => ContactCollection.findOneAndDelete(filter);
