const express = require("express");
const todoRouter = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const {
    addTodo,
    deleteTodo,
    getTodo,
    updateTodo,
} = require("../controllers/todoControllers");

todoRouter.route("/").get(getTodo).post(addTodo);
todoRouter.route("/:id").delete(deleteTodo).put(updateTodo);

module.exports = todoRouter;
