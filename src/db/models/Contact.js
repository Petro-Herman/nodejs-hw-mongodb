import { Schema, model } from "mongoose";
import { typeList } from "../../constants/contacts.js";
import { handleSaveError, setUpdateSettings } from "./hooks.js";

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
    isFavourite: {
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
}, { versionKey: false, timestamps: true })

contactSchema.post("save", handleSaveError);

contactSchema.pre("findOneAndUpdate", setUpdateSettings);

contactSchema.post("findOneAndUpdate", handleSaveError);

export const sortByList = ["name", "phoneNumber", "email"];

const ContactCollection = model("contact", contactSchema);

export default ContactCollection;

