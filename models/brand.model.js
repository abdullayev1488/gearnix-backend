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
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

brandSchema.virtual("products", {
    ref: "Product",
    localField: "_id",
    foreignField: "brand"
})

export const Brand = model("Brand", brandSchema)