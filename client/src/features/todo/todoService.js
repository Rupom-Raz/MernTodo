import axios from "axios";
const API_URL = "http://localhost:4000/api/todo";

//Create new todo
export const createTodo = async (text) => {
    console.log(text);
    
    const response = await axios.post(API_URL, text);
    return response.data;
};

//Get  todos
export const getTodos = async (todos) => {
    const response = await axios.get(API_URL);
    return response.data;
};

//Update todo
export const updateTodo = async (id, todoData) => {
    const response = await axios.put(`${API_URL}/${id}`, todoData);
    return response.data;
};

//Delete todo
export const deleteTodo = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
};
const todoService = {
    createTodo,
    getTodos,
    updateTodo,
    deleteTodo,
};

export default todoService;
