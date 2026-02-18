import mongoose from "mongoose";

export const configDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('DB Connected!');
    } catch (error) {
        console.log(error);
        process.exit();
    }
}
