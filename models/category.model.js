import mongoose from "mongoose";

const { Schema } = mongoose;

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

export const Category = mongoose.model("Category", categorySchema);

