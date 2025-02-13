const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const app = express();

dotenv.config({ path: path.resolve(__dirname, "../.env") });

// Set up the port
const port = process.env.PORT || 3000;

// Routes
const mainRoutes = require("./routes/main");
const authRoutes = require("./routes/auth");
const shopRoutes = require("./routes/shop");
const infoRoutes = require("./routes/info")
const cartRoute = require("./routes/cart")
const CollectionRoutes = require("./routes/Collection")
const UserRoutes = require("./routes/User")
const productRoutes = require("./routes/Product")
const ordersRoutes = require("./routes/Orders")
const PaymentmentRoutes = require("./routes/Payments")

app.use(express.json());
app.use("/static", express.static(path.join(__dirname, "Static")));

// Use the modularized routes
app.use("/", mainRoutes);
app.use("/info", infoRoutes)
app.use("/Auth", authRoutes);
app.use("/Shop", shopRoutes);
app.use("/cart", cartRoute)
app.use("/shop/Collection/Categories", CollectionRoutes)
app.use("/User/Profile/", UserRoutes)
app.use("/Product", productRoutes)
app.use("/User/Orders/", ordersRoutes)
app.use("/Payments/", PaymentmentRoutes)

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "templates/Utility", "404.html"));
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
