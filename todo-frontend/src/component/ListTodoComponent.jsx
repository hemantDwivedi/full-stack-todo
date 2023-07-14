import { useEffect, useState } from "react"
import { retrieveAllTodos } from "../service/TodoApiService"
import { Link } from "react-router-dom"

const ListTodoComponent = () => {

    const [todos, setTodos] = useState([])

    useEffect(() => {
        listTodos()
    }, [])

    function listTodos(){
        retrieveAllTodos()
        .then(response => setTodos(response.data))
        .catch(error => console.error(error))
    }

    return (
        <div>
            <div className="container mt-4">
                <p className="fw-light fs-4 text-center">List of Todos</p>
                <div>
                    <Link to='/add-todo' className="btn btn-info my-3">ADD TODO</Link>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Completed</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                todos.map(todo =>
                                    <tr key={todo.id}>
                                        <td>{todo.title}</td>
                                        <td>{todo.description}</td>
                                        <td>{todo.completed ? 'Yes' : 'No'}</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ListTodoComponent