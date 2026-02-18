import { Category } from "../../models/category.model.js";

export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findByIdAndDelete(id);

        return !category
            ? res.status(404).json({ success: false, message: "Category not found" })
            : res.status(200).json({
                success: true,
                message: "Category deleted successfully",
                data: category
            });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}