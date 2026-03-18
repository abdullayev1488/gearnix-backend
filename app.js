import express from "express";
import { configDb } from "./config/configDb.js";
import { configPackages } from "./config/configPackages.js";
import "dotenv/config";
import { CategoryRouter } from "./routes/category.route.js";
import { BrandRouter } from "./routes/brands.route.js";
import { ProductRouter } from "./routes/product.route.js";
import { UserRouter } from "./routes/user.route.js";
import { OrderRouter } from "./routes/order.route.js";
import { ContactRouter } from "./routes/contact.route.js";
import { errorHandler } from "./middleware/errorHandler.js";


const PORT = process.env.PORT || 7000;
const app = express();

configPackages(app);

app.use("/api/category", CategoryRouter);
app.use("/api/brand", BrandRouter);
app.use("/api/product", ProductRouter);
app.use("/api/auth", UserRouter);
app.use("/api/order", OrderRouter);
app.use("/api/contact", ContactRouter);



app.use(errorHandler);

await configDb();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}
        http://localhost:${PORT}
        `);
});
