// server/index.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const blogRoutes = require("./routes/blogRoutes");
const authRoutes = require("./routes/authRoutes");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // parse JSON bodies
app.use("/api/blogs", blogRoutes);
app.use("/api/auth", authRoutes);

// MongoDB connection
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("✅ MongoDB Connected"))
    .catch((err) => console.error("❌ MongoDB connection error:", err));

// Default Route
app.get("/", (req, res) => {
    res.send("Blog API running...");
});

app.listen(PORT, () => {
    console.log(`🚀 Server started on http://localhost:${PORT}`);
});
