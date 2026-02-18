import { Category } from "../../models/category.model.js"

export const getAllCategories = async (req, res) => {
    try {
        const allCategories = await Category.find()
        res.status(200).json({ success: true, data: allCategories })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}
