const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const User = require("../Models/userSchema");

//Genarate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JSON_TOKEN, { expiresIn: "20d" });
};

//Register a user
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    try {
        //Check all fields properly
        if (!name || !email || !password) {
            res.status(400).json({
                message: "Make sure you are fillup all fields",
            });
        }
        //Check User exists
        const checkExist = await User.findOne({ email });
        if (checkExist) {
            res.status(400).json({
                message: "Email already exist",
            });
        }
        //Hashing password
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);

        //Create user
        const user = await User.create({
            name,
            email,
            password: hashedPass,
        });
        // Check user successfull insert in DB
        if (user) {
            res.status(202).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
            });
        } else {
            res.status(400).json({
                message: "User didn't insert in DB!!!",
            });
        }
    } catch (error) {
        res.status(400).json({
            message: "Error hoise",
        });
    }
});

//Login a user
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    //Check user email
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        res.status(401).json({ message: "Wrong Credentials" });
    }
});
//get user profile
const userProfile = asyncHandler(async (req, res) => {
    res.status(200).json(req.user)
  })

module.exports = { registerUser, loginUser,userProfile };
