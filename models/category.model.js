import { model, Schema } from "mongoose";

const categorySchema = new Schema({
    images: {
        shop: {
            type: String,
            required: true
        },
        home: String,
    },
    name: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

categorySchema.virtual("products", {
    ref: "Product",
    localField: "_id",
    foreignField: "category"
})

export const Category = model("Category", categorySchema);

