import { Category } from "../../models/category.model.js"

export const createCategory = async (req, res) => {
    console.log(req.body);
    
    try {
        const { name, image } = req.body;
        const category = await Category.create({ name, images: {shop:image} });
        res.status(200).json({ success: true, data: category });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}
