import axios from "axios";
import { apiClient } from "./ApiClient";
import { getToken } from "./AuthApiService";

axios.interceptors.request.use(function (config) {
    
    config.headers['Authorization'] = getToken();

    return config;
  }, function (error) {
    return Promise.reject(error);
  });

  
export const retrieveAllTodos = () => apiClient.get('/todos')

export const createTodo = (todo) => apiClient.post(todo)

export const retrieveSpecificTodo = (id) => apiClient.get(`/${id}`)

export const updateExistingTodo = (todo, id) => apiClient.put(`/${id}`, todo)

export const deleteExistingTodo = (id) => apiClient.delete(`/${id}`)

export const completedTodo = (id) => apiClient.patch(`/${id}/completed`)

export const unCompletedTodo = (id) => apiClient.patch(`/${id}/uncompleted`)