import axios from "axios";
import { getToken } from "./AuthApiService";

const TODO_BASE_API_URL = 'http://localhost:8080/api/v1/todos'

axios.interceptors.request.use(function (config) {
    
    config.headers['Authorization'] = getToken();

    return config;
  }, function (error) {
    return Promise.reject(error);
  });

  
export const retrieveAllTodos = () => axios.get(TODO_BASE_API_URL) // 'http://localhost:8080/api/v1/todo/todos'

export const createTodo = (todo) => axios.post(TODO_BASE_API_URL, todo)

export const retrieveSpecificTodo = (id) => axios.get(TODO_BASE_API_URL + '/' + id)

export const updateExistingTodo = (todo, id) => axios.put(TODO_BASE_API_URL + '/' + id, todo)

export const deleteExistingTodo = (id) => axios.delete(TODO_BASE_API_URL + '/' + id)

export const completedTodo = (id) => axios.patch(TODO_BASE_API_URL + '/' + id + '/completed')

export const unCompletedTodo = (id) => axios.patch(TODO_BASE_API_URL + '/' + id + '/uncompleted')