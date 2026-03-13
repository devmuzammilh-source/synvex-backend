const express = require("express");
const app = express();
require("dotenv").config();

require("./config/db");

const authRoutes = require("./routes/authRoutes");

app.use(express.json());

app.get("/api", authRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});