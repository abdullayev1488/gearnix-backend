import { Category } from "../../models/category.model.js"

export const getCategoryById = async (req, res) => {
    const { id } = req.params
    try {
        const category = await Category.findById(id)
        res.status(200).json({ success: true, data: category })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}
