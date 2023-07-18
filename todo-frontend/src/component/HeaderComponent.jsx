import React from 'react'
import { NavLink, useNavigate } from "react-router-dom"
import { isUserLoggedIn, logout } from '../service/AuthApiService'

const HeaderComponent = () => {

    const isAuth = isUserLoggedIn()
    const navigate = useNavigate()

    function handleLogout() {
        logout()
        navigate('/login')
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-info">
                <div className="container-fluid">
                    <a className="navbar-brand">Todo Management</a>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            {isAuth &&
                                <li className="nav-item">
                                    <NavLink className='nav-link active' to='/todos'>Todos</NavLink>
                                </li>
                            }
                        </ul>
                    </div>
                    <ul className="navbar-nav">
                        {
                            !isAuth &&

                            <li className="nav-item">
                                <NavLink className='nav-link' to='/register'>Register</NavLink>
                            </li>
                        }
                        {
                            !isAuth &&
                            <li className="nav-item">
                                <NavLink className='nav-link' to='/login'>Login</NavLink>
                            </li>
                        }
                        {
                            isAuth &&
                            <li className="nav-item">
                                <NavLink className='nav-link' to='/login' onClick={handleLogout}>Logout</NavLink>
                            </li>
                        }
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default HeaderComponent