import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import todoRedecer from "../features/todo/todoSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        todo: todoRedecer,
    },
});
