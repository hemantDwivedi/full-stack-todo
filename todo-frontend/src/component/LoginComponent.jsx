import React, { useState } from "react"
import { loginApi, saveLoggedUser, storeToken } from "../service/AuthApiService"
import { useNavigate } from "react-router-dom"

const LoginComponent = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    async function handleLoginForm(event) {
        event.preventDefault()
        await loginApi(username, password)
            .then(response => {
                console.log(response.data);
                // const token = 'Basic ' + window.btoa(username + ":" + password)
                const token =  'Bearer ' + response.data.accessToken
                const role = response.data.role
                storeToken(token)
                saveLoggedUser(username, role)
                navigate('/todos')
            })
            .catch(error => console.error(error))
    }

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-md-4 offset-md-4 mt-5">
                        <div className="card">
                            <div className="card-header">
                                <p className="fw-light fs-2 text-center">Login</p>
                            </div>
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label className="control-label mb-2">Username or Email</label>
                                        <input
                                            type="text"
                                            name="username"
                                            className="form-control mb-2"
                                            placeholder="Enter username"
                                            value={username}
                                            onChange={(event) => setUsername(event.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label mb-2">Password</label>
                                        <input
                                            type="password"
                                            name="password"
                                            className="form-control mb-2"
                                            placeholder="Enter password"
                                            value={password}
                                            onChange={(event) => setPassword(event.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <button className="btn btn-info w-100 mt-4" onClick={(event) => handleLoginForm(event)}>Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginComponent