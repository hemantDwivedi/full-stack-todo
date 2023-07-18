import axios from "axios";

export const apiClient = axios.create({
    baseURL: 'http://localhost:8080/api/v1'
})

export const authApiClient = axios.create({
    baseURL: 'http://localhost:8080/api/auth'
})