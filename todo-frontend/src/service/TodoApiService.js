import axios from "axios";

const BASE_REST_API_URL = 'http://localhost:8080/api/v1/todos'

export const retrieveAllTodos = () => axios.get(BASE_REST_API_URL)

export const createTodo = (todo) => axios.post(BASE_REST_API_URL, todo)

export const retrieveSpecificTodo = (id) => axios.get(BASE_REST_API_URL + '/' + id)

export const updateExistingTodo = (todo, id) => axios.put(BASE_REST_API_URL + '/' + id, todo)

export const deleteExistingTodo = (id) => axios.delete(BASE_REST_API_URL + '/' + id)

export const completedTodo = (id) => axios.patch(BASE_REST_API_URL + '/' + id + '/completed')

export const unCompletedTodo = (id) => axios.patch(BASE_REST_API_URL + '/' + id + '/uncompleted')