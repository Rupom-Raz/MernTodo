import React from "react";
import { useDispatch } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { deleteTodo } from "../features/todo/todoService";
const TodoItem = ({ todo }) => {
    const dispatch = useDispatch();

    return (
        <>
            <div className="goal">
                <div>
                    {new Date(todo.date).toLocaleTimeString("en-US")}
                </div>
                <h2>{todo.text}</h2>
                <button className="delete" onClick={() => dispatch(deleteTodo(todo._id))}>
                    <FaTrash color="red"/>
                </button>
            </div>
        </>
    );
};

export default TodoItem;
