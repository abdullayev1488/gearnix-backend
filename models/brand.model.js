import { model, Schema } from "mongoose"

const brandSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    status: {
        type: Boolean,
        default: true,
    },
    image: {
        type: String,
        required: true,
    } 
})

export const Brand = model("Brand", brandSchema)