import { useEffect, useState } from "react"
import { completedTodo, deleteExistingTodo, retrieveAllTodos, unCompletedTodo } from "../service/TodoApiService"
import { Link, useNavigate } from "react-router-dom"

const ListTodoComponent = () => {

    const [todos, setTodos] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        listTodos()
    }, [])

    function listTodos() {
        retrieveAllTodos()
            .then(response => setTodos(response.data))
            .catch(error => console.error(error))
    }

    function updateTodo(id){
        navigate(`/update-todo/${id}`)
    }
    
    function deleteTodo(id){
        deleteExistingTodo(id)
        .then(navigate('/todos'))
        .catch(error => console.log(error))
    }

    function markCompletedTodo(id){
        completedTodo(id)
        .then(listTodos())
        .catch(error => console.error(error))
    }
    
    function markUncompletedTodo(id){
        unCompletedTodo(id)
        .then(listTodos())
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
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                todos.map(todo =>
                                    <tr key={todo.id}>
                                        <td>{todo.title}</td>
                                        <td>{todo.description}</td>
                                        <td>{todo.completed ? 'Yes' : 'No'}</td>
                                        <td>
                                            <button className="btn btn-dark" onClick={() => markCompletedTodo(todo.id)}>COMPLETED</button>
                                            <button className="btn btn-info mx-2" onClick={() => markUncompletedTodo(todo.id)}>UNCOMPLETED</button>
                                        </td>
                                        <td>
                                            <button className="btn btn-dark" onClick={() => updateTodo(todo.id)}>UPDATE</button>
                                            <button className="btn btn-info mx-2" onClick={() => deleteTodo(todo.id)}>DELETE</button>
                                        </td>
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