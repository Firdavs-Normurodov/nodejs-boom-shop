import express from "express";
import { create } from "express-handlebars";
import AuthRoutes from "./routes/auth.js";
import ProductsRoutes from "./routes/products.js";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import flash from "connect-flash";
import session from "express-session";
dotenv.config();

const app = express();
const hbs = create({
  defaultLayout: "main",
  extname: "hbs",
});
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "./views");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({ secret: "Firdavs", resave: false, saveUninitialized: false })
);
app.use(flash());

app.use(AuthRoutes);
app.use(ProductsRoutes);
const startApp = () => {
  try {
    mongoose.set("strictQuery", false);
    mongoose
      .connect(process.env.MONGO_URI, {})
      .then(() => {
        console.log("Connected");
      })
      .catch(() => {
        console.log("Failed");
      });
    const PORT = process.env.PORT || 4100;
    app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
  } catch (error) {
    error;
  }
};
startApp();
