import { typeList } from "../constants/contacts.js";

const parseBoolean = (boolean) => {
    if (typeof boolean !== "string") {
        return;
    }
    if (boolean == "true") {
        return "true";
    }
    if (boolean == "false") {
        return "false"
    }
}

const parseType = (contactType) => {
    if (typeof contactType !== "string") {
        return;
    }
    const parsedType = typeList.includes(contactType) ? contactType : NaN;
    return parsedType;
}

export const parseContactFilter = ({ isFavorite, type }) => {
    const parsedIsFavorite = parseBoolean(isFavorite);
    const parsedTypeContact = parseType(type);
    return {
        parsedIsFavorite,
        parsedTypeContact,
    }
}


