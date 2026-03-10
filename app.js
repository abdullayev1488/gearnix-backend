import express from "express";
import { configDb } from "./config/configDb.js";
import { configPackages } from "./config/configPackages.js";
import "dotenv/config";
import { CategoryRouter } from "./routes/category.route.js";
import { BrandRouter } from "./routes/brands.route.js";
import { ProductRouter } from "./routes/product.route.js";
import { UserRouter } from "./routes/user.route.js";
import { welcomeTemplate } from "./const/index.const.js";
import { errorHandler } from "./middleware/errorHandler.js";


const PORT = process.env.PORT || 7000;
const app = express();

configPackages(app);

// Routes
app.use("/api/category", CategoryRouter);
app.use("/api/brand", BrandRouter);
app.use("/api/product", ProductRouter);
app.use("/api/auth", UserRouter);

app.use("/", (_, res) => {
    res.send(welcomeTemplate);
});

// Global error handler (must be after routes)
app.use(errorHandler);

await configDb();

// export const products = [
//     { name: "Razer Viper Storm", image: "/img/product/1.png", price: 90, oldPrice: 99, rating: 4, reviews: 1, status: true, discount: "", category: "699bc7309666145cec37f36e", brand: "699e4aa1496704fb4a366ad0" },
//     { name: "Razer BlackWidow X", image: "/img/product/2.webp", price: 16, oldPrice: 19, rating: 5, reviews: 2, status: true, discount: "", category: "699bc7309666145cec37f36d", brand: "699e4aa1496704fb4a366acf" },
//     { name: "Razer DeathAdder Pro", image: "/img/product/3.webp", price: 33, oldPrice: 44, rating: 3, reviews: 0, status: true, discount: "", category: "699bc7309666145cec37f36e", brand: "699e4aa1496704fb4a366ace" },
//     { name: "SteelSeries Arctis Nova", image: "/img/product/4.webp", price: 65, oldPrice: null, rating: 4, reviews: 0, status: true, discount: "", category: "699bc7309666145cec37f36f", brand: "699e4aa1496704fb4a366acd" },
//     { name: "Corsair K70 RGB", image: "/img/product/5.png", price: 15, oldPrice: null, rating: 5, reviews: 0, status: true, discount: "", category: "699bc7309666145cec37f36d", brand: "699e4aa1496704fb4a366acf" },
//     { name: "Logitech G Pro X Headset", image: "/img/product/6.webp", price: 38, oldPrice: null, rating: 3, reviews: 1, status: true, discount: "", category: "699bc7309666145cec37f36f", brand: "699e4aa1496704fb4a366acc" },
//     { name: "Razer Basilisk V3", image: "/img/product/7.webp", price: 8, oldPrice: 9, rating: 4, reviews: 0, status: true, discount: "", category: "699bc7309666145cec37f36e", brand: "699e4aa1496704fb4a366acb" },
//     { name: "Razer Kraken Ultimate", image: "/img/product/8.webp", price: 19, oldPrice: null, rating: 5, reviews: 0, status: true, discount: "", category: "699bc7309666145cec37f36f", brand: "699e4aa1496704fb4a366ad0" },
//     { name: "Razer Barracuda X", image: "/img/product/9.webp", price: 50, oldPrice: null, rating: 3, reviews: 0, status: true, discount: "", category: "699bc7309666145cec37f36f", brand: "699e4aa1496704fb4a366ace" },
//     { name: "Razer Wolverine V2 Controller", image: "/img/product/10.webp", price: 15, oldPrice: null, rating: 4, reviews: 0, status: true, discount: "", category: "699bc7309666145cec37f370", brand: "699e4aa1496704fb4a366acb" },
//     { name: "HyperX Cloud Flight", image: "/img/product/11.webp", price: 13, oldPrice: null, rating: 5, reviews: 0, status: true, discount: "", category: "699bc7309666145cec37f372", brand: "699e4aa1496704fb4a366ace" },
//     { name: "Corsair Scuf Impact", image: "/img/product/12.png", price: 56, oldPrice: null, rating: 3, reviews: 0, status: true, discount: "", category: "699bc7309666145cec37f370", brand: "699e4aa1496704fb4a366acf" },
//     { name: "SteelSeries Rival 5", image: "/img/product/13.png", price: 22, oldPrice: null, rating: 4, reviews: 0, status: true, discount: "", category: "699bc7309666145cec37f36e", brand: "699e4aa1496704fb4a366acd" },
//     { name: "SteelSeries Apex Pro", image: "/img/product/14.webp", price: 32, oldPrice: null, rating: 5, reviews: 0, status: true, discount: "", category: "699bc7309666145cec37f36d", brand: "699e4aa1496704fb4a366ad0" },
//     { name: "Corsair K95 Platinum", image: "/img/product/15.webp", price: 18, oldPrice: null, rating: 3, reviews: 0, status: true, discount: "", category: "699bc7309666145cec37f36d", brand: "699e4aa1496704fb4a366acf" },
//     { name: "Corsair HS80 Wireless", image: "/img/product/16.webp", price: 44, oldPrice: null, rating: 4, reviews: 0, status: true, discount: "", category: "699bc7309666145cec37f372", brand: "699e4aa1496704fb4a366acf" },
//     { name: "Corsair Elite Controller", image: "/img/product/17.webp", price: 18, oldPrice: null, rating: 5, reviews: 0, status: true, discount: "", category: "699bc7309666145cec37f370", brand: "699e4aa1496704fb4a366acf" },
//     { name: "Corsair Reflex Pro Controller", image: "/img/product/18.png", price: 39, oldPrice: null, rating: 3, reviews: 0, status: true, discount: "", category: "699bc7309666145cec37f370", brand: "699e4aa1496704fb4a366ad0" },
//     { name: "SteelSeries Aerox 3", image: "/img/product/19.webp", price: 52, oldPrice: null, rating: 4, reviews: 0, status: true, discount: "", category: "699bc7309666145cec37f36e", brand: "699e4aa1496704fb4a366acd" },
//     { name: "SteelSeries Prime Wireless", image: "/img/product/20.webp", price: 30, oldPrice: null, rating: 5, reviews: 0, status: true, discount: "", category: "699bc7309666145cec37f36e", brand: "699e4aa1496704fb4a366acd" },
//     { name: "Razer Huntsman Mini", image: "/img/product/21.webp", price: 32, oldPrice: null, rating: 3, reviews: 0, status: true, discount: "", category: "699bc7309666145cec37f36d", brand: "699e4aa1496704fb4a366acb" },
//     { name: "SteelSeries Apex 7", image: "/img/product/22.webp", price: 22, oldPrice: null, rating: 4, reviews: 0, status: true, discount: "", category: "699bc7309666145cec37f36d", brand: "699e4aa1496704fb4a366ad0" },
//     { name: "SteelSeries Arctis 7 Wireless", image: "/img/product/23.png", price: 46, oldPrice: null, rating: 5, reviews: 0, status: true, discount: "", category: "699bc7309666145cec37f372", brand: "699e4aa1496704fb4a366ace" },
//     { name: "Razer Wolverine Tournament", image: "/img/product/24.png", price: 15, oldPrice: null, rating: 3, reviews: 0, status: true, discount: "", category: "699bc7309666145cec37f370", brand: "699e4aa1496704fb4a366acb" },
//     { name: "Corsair Pro Controller X", image: "/img/product/25.webp", price: 50, oldPrice: null, rating: 4, reviews: 0, status: true, discount: "", category: "699bc7309666145cec37f370", brand: "699e4aa1496704fb4a366acf" },
//     { name: "Logitech G502 Hero", image: "/img/product/1.png", price: 37, oldPrice: null, rating: 5, reviews: 0, status: true, discount: "", category: "699bc7309666145cec37f36e", brand: "699e4aa1496704fb4a366acc" },
//     { name: "SteelSeries Apex TKL", image: "/img/product/2.webp", price: 12, oldPrice: null, rating: 4, reviews: 1, status: true, discount: "", category: "699bc7309666145cec37f36d", brand: "699e4aa1496704fb4a366acd" },
//     { name: "Corsair M65 Ultra", image: "/img/product/3.webp", price: 44, oldPrice: null, rating: 5, reviews: 0, status: true, discount: "", category: "699bc7309666145cec37f36e", brand: "699e4aa1496704fb4a366acf" }
// ];



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}
        http://localhost:${PORT}
        `);
});


// await Product.insertMany(products);