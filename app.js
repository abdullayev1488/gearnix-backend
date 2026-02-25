import express from "express";
import { configDb } from "./config/configDb.js";
import { configPackages } from "./config/configPackages.js";
import "dotenv/config";
import { CategoryRouter } from "./routes/category.route.js";
import { BrandRouter } from "./routes/brands.route.js";
import { ProductRouter } from "./routes/product.route.js";
import { welcomeTemplate } from "./const/index.const.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { Product } from "./models/product.model.js";


const PORT = process.env.PORT || 3000;
const app = express();

configPackages(app);

// Routes
app.use("/category", CategoryRouter);
app.use("/brand", BrandRouter);
app.use("/product", ProductRouter);

app.use("/", (_, res) => {
    res.send(welcomeTemplate);
});

// Global error handler (must be after routes)
app.use(errorHandler);

await configDb();



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}
        http://localhost:${PORT}
        `);
});