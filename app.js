const express = require("express");
const app = express();
const restaurantRoutes = require("./routes/restaurantRoutes");


app.use(express.json());
app.use("/api/restaurant", restaurantRoutes);

module.exports =app;
