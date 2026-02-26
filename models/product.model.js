import { model, Schema } from "mongoose";

const productSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        image: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true,
            min: 0
        },
        oldPrice: {
            type: Number,
            default: null
        },
        rating: {
            type: Number,
            default: 0,
            min: 0,
            max: 5
        },
        reviews: {
            type: Number,
            default: 0,
            min: 0
        },
        status: {
            type: Boolean,
            default: true
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: "Category",
            required: true
        },
        brand: {
            type: Schema.Types.ObjectId,
            ref: "Brand"
        },
        discount: {
            type: String,
            default: ""
        }
    },
    { timestamps: true }
);

export const Product = model("Product", productSchema);
