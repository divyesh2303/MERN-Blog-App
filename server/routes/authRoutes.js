// routes/authRoutes.js
const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const router = express.Router();

router.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (
        username === process.env.ADMIN_USERNAME &&
        password === process.env.ADMIN_PASSWORD
    ) {
        const token = jwt.sign({ username }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });
        return res.json({ token });
    } else {
        return res.status(401).json({ message: "Invalid credentials" });
    }
});

module.exports = router;
