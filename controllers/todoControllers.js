const asyncHandler = require("express-async-handler");

const User = require("../Models/userSchema");
const Todo = require("../Models/todoSchema");

//Get todos
const getTodo = asyncHandler(async (req, res) => {
    const todo = await Todo.find();

    res.status(200).json(todo);
});

//Add new todo
const addTodo = asyncHandler(async (req, res) => {
    const { text } = req.body;
    try {
        if (!text) {
            res.status(400).json({ message: "Please add a todo" });
        } else {
            const addTodo = await new Todo({
                text,
            });
            await addTodo.save((error) => {
                if (error) {
                    res.status(500).json({ mesaage: error.mesaage });
                } else {
                    res.status(200).json({
                        mesaage: "Todo inserted successfully",
                    });
                }
            });
        }
    } catch (err) {
        console.log(err);
    }
});

//Update TODO
const updateTodo = asyncHandler(async (req, res) => {
    try {
        await Todo.findByIdAndUpdate(
            req.params.id,
            { text: req.body.text },
            { new: true },
            (err) => {
                if (!err) {
                    res.status(200).json("Todo Updated Suceessfull");
                } else {
                    res.status(400).json({ message: err.message });
                }
            }
        );
    } catch (error) {}
});

//Delete todo
const deleteTodo = asyncHandler(async (req, res) => {
    try {
        await Todo.findByIdAndRemove(req.params.id, {}, (err) => {
            if (err) {
                res.status(500).json({ message: err.message });
            } else {
                res.status(200).json({
                    message: "Todo deleted successfully",
                });
            }
        });
    } catch (error) {
        console.log(error);
    }
});

module.exports = { getTodo, addTodo, deleteTodo, updateTodo };
