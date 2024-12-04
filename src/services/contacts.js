import ContactCollection from "../db/models/Contact.js";
import { calculatePaginationData } from "../utils/calculatePaginationData.js";

export const getContacts = async ({ page = 1, perPage = 10, sortBy = "_id", sortOrder = "asc", filter = {} }) => {
    const skip = (page - 1) * perPage;
    const query = ContactCollection.find().skip(skip).sort({ [sortBy]: sortOrder });
    if (filter.parsedIsFavorite == "true") {
        query.where("isFavorite").equals("true");
    }
    if (filter.parsedIsFavorite == "false") {
        query.where("isFavorite").equals("false");
    }
    if (filter.parsedTypeContact) {
        query.where("contactType").equals(filter.parsedTypeContact);
    }

    const totalItems = await ContactCollection.find().merge(query).countDocuments();
    const data = await query.limit(perPage);
    const paginationData = calculatePaginationData({ totalItems, page, perPage });
    return {
        data,
        ...paginationData,
    };
};

export const getContactById = contactId => ContactCollection.findById(contactId);

export const addContact = payload => ContactCollection.create(payload);

export const updateContact = async ({ _id, payload, options = {} }) => {
    const data = await ContactCollection.findByIdAndUpdate({ _id }, payload, {
        ...options,
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

