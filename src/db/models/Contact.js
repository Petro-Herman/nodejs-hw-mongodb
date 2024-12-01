import { Schema, model } from "mongoose";
import { typeList } from "../../constants/contacts.js";

const contactSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    email: String,
    isFavorite: {
        type: Boolean,
        required: true,
        default: false,
    },
    contactType: {
        type: String,
        enum: typeList,
        required: true,
        default: "personal",
    }
}, {versionKey: false, timestamps: true})

const ContactCollection = model("contact", contactSchema);

export default ContactCollection;
