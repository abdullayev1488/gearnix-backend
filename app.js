import express from "express";
import { configDb } from "./config/configDb.js";
import { configPackages } from "./config/configPackages.js";
import "dotenv/config";
import { CategoryRouter } from "./routes/category.route.js";
import { Category } from "./models/category.model.js";
import { welcomeTemplate } from "./const/index.const.js";

const PORT = process.env.PORT || 5000;
const app = express();
configPackages(app);
app.use('/category', CategoryRouter)

app.use('/',(_,res)=>{
    res.send(welcomeTemplate)
})

await configDb();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}
        http://localhost:3000
        `);
});