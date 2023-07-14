import axios from "axios";

const BASE_REST_API_URL = 'http://localhost:8080/api/v1/todos'

export const retrieveAllTodos = () => axios.get(BASE_REST_API_URL)

export const createTodo = (todo) => axios.get(BASE_REST_API_URL, todo)