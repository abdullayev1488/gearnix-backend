import {model,Schema} from "mongoose";

const categorySchema = new Schema({
    images: {
        shop: {
            type: String,
            required: true
        },
        home:String,
    },
    name: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    }
})

export const Category = model("Category", categorySchema);

