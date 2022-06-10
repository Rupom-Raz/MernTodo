import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createTodo } from "../features/todo/todoService";

const TodoForm = () => {
    const [text, setText] = useState("");
    const dispatch = useDispatch();

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(createTodo(text));
        setText("");
    };

    return (
        <>
            <section className="form">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label htmlFor="text">Set your objective</label>
                        <input
                            type="text"
                            name="text"
                            placeholder="Enter your objective"
                            value={text}
                            id="text"
                            onChange={(e) => setText(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-block">
                            Add Todo
                        </button>
                    </div>
                </form>
            </section>
        </>
    );
};

export default TodoForm;
