const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const todoRouter = require("./Routes/todoRoutes");
const { protect } = require("./middlewares/authMiddleware");
const userRouter = require("./Routes/userRoutes");
const app = express();

require("dotenv").config();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

//Database connection

mongoose
    .connect(process.env.MONGODB_LOCAL_STRING)
    .then(() => console.log("Database connected successfully"))
    .catch((err) => console.log(err.message));

//All Routes goes here
app.use("/api/user", userRouter);
app.use("/api/todo", todoRouter);

app.use((req, res) => {
    res.status(400).json({ message: "Url not found" });
});

module.exports = app;
