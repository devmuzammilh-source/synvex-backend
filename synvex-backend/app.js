const express = require("express");
const app = express();

require("./config/db");

const authRoutes = require("./routes/authRoutes");

app.use(express.json());

app.use("/api", authRoutes);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});