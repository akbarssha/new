require("dotenv").config();

const app = require("./app");
const connectDB = require("./configue/db.js");


connectDB();

app.listen(3002, () => console.log("Server running on port 3002"));