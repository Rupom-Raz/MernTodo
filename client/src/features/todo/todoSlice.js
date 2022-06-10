import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import todoService from "./todoService";

const initialState = {
    todos: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

//Create new todo
export const createTodo = createAsyncThunk(
    "todos/createTodo",
    async (text, thunkAPI) => {
        console.log(text);

        try {
            // const token = thunkAPI.getState().auth.user.token;
            return await todoService.createTodo(text);
        } catch (error) {
            console.log(error);

            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

//Get  todos
export const getTodos = createAsyncThunk(
    "todos/getTodos",
    async (todos, thunkAPI) => {
        

        try {
            // const token = thunkAPI.getState().auth.user.token;
            return await todoService.getTodos(todos);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);
//Delete user todos
export const deleteTodo = createAsyncThunk(
    "todos/deleteTodo",
    async (id, thunkAPI) => {
        try {
            // const token = thunkAPI.getState().auth.user.token;
            return await todoService.deleteTodo(id);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

//Update user goals
export const updateTodo = createAsyncThunk(
    "todos/updateTodo",
    async (todoData, thunkAPI) => {
        try {
            // const token = thunkAPI.getState().auth.user.token;
            return await todoService.updateTodo(todoData);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
        }
    }
);

export const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createTodo.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createTodo.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload;
                state.todos.push(action.payload);
            })
            .addCase(createTodo.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getTodos.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getTodos.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.todos = action.payload;
            })
            .addCase(getTodos.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(deleteTodo.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteTodo.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload;
                state.todos = state.todos.filter(
                    (todo) => todo.id !== action.payload
                );
            })
            .addCase(deleteTodo.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});
export const { reset } = todoSlice.actions;
export default todoSlice.reducer;
