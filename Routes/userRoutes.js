const express = require("express");
const userRouter = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const {
    loginUser,
    registerUser,
    userProfile,
} = require("../controllers/userControllers");

userRouter.post("/", registerUser);
userRouter.post("/login", loginUser);
userRouter.put("/me", protect, userProfile);

module.exports = userRouter;
