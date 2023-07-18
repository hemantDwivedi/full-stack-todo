import { authApiClient } from './ApiClient'

export const registerApi = (user) => authApiClient.post('/register', user)

export const loginApi = (usernameOrEmail, password) => authApiClient.post('/login', { usernameOrEmail, password })

export const storeToken = (token) => localStorage.setItem("token", token);

export const getToken = () => localStorage.getItem("token");

export const saveLoggedUser = (username, role) => {
    sessionStorage.setItem("authenticatedUser", username)
    sessionStorage.setItem("role", role)
}

export const isUserLoggedIn = () => {

    const username = sessionStorage.getItem("authenticatedUser")

    if (username == null) {
        return false
    } else {
        return true
    }
}

export const getLoggedInUser = () => {
    const username = sessionStorage.getItem("authenticatedUser")
    return username
}

export const logout = () => {
    localStorage.clear()
    sessionStorage.clear()
}

export const isAdminUser = () => {
    let role = sessionStorage.getItem("role")

    if(role != null && role === 'ROLE_ADMIN') return true
    else return false
}