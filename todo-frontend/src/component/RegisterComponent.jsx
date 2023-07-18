import { useState } from "react"
import { registerApi } from "../service/AuthApiService"
import {useNavigate} from 'react-router-dom'

const RegisterComponent = () => {

    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()


    function handleRegistrationForm(event){
        event.preventDefault()

        const register = {name, username, email, password}

        registerApi(register)
        .then(response => {
            console.log(response.data);
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
                                <p className="fw-light fs-2 text-center">User Registration Form</p>
                            </div>
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label className="control-label mb-2">Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            className="form-control mb-2"
                                            placeholder="Enter name"
                                            value={name}
                                            onChange={(event) => setName(event.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label mb-2">Username</label>
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
                                        <label className="control-label mb-2">Email</label>
                                        <input
                                            type="text"
                                            name="email"
                                            className="form-control mb-2"
                                            placeholder="Enter email address"
                                            value={email}
                                            onChange={(event) => setEmail(event.target.value)}
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
                                        <button className="btn btn-info w-100 mt-4" onClick={(event) => handleRegistrationForm(event)}>Submit</button>
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

export default RegisterComponent