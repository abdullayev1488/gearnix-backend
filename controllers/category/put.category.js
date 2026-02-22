import { Category } from "../../models/category.model.js"

export const editCategory = async (req, res) => {
    const {id} = req.params
    try {
        const { name, image, status } = req.body;
        const editCategory = await Category.findByIdAndUpdate(id,{ name, images: {shop:image},status });
        res.status(200).json({ success: true, data: editCategory });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}
