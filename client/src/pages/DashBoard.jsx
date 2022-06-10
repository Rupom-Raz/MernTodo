import React, { useEffect } from "react";
import TodoForm from "../components/TodoForm";
import TodoItem from "../components/TodoItem";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/Spinner";
import { reset, getTodos } from "../features/todo/todoSlice";

const DashBoard = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { todos, isLoading, isError, message } = useSelector(
        (state) => state.todo
    );
    useEffect(() => {
        dispatch(getTodos());
        return () => {
            dispatch(reset());
        };
    }, [user, dispatch]);
    if (isLoading) {
        return <Spinner />;
    }
    return (
        <>
            <section className="heading">
                <h1>Welcome {user && user.name}</h1>
                <p>Goals Dashboard</p>
            </section>

            <TodoForm />

            <section className="content">
                {todos.length > 0 ? (
                    <div className="goals">
                        {user &&
                            todos.map((todo) => (
                                <TodoItem key={todo._id} todo={todo} />
                            ))}
                    </div>
                ) : (
                    <h3>You have not set any goals</h3>
                )}
            </section>
        </>
    );
};

export default DashBoard;
