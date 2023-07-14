import { useEffect, useState } from "react"
import { createTodo, retrieveSpecificTodo, updateExistingTodo } from "../service/TodoApiService"
import { useNavigate, useParams } from "react-router-dom"

const TodoComponent = () => {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [completed, setCompleted] = useState('')
    const { id } = useParams()
    const navigate = useNavigate()
    const [errors, setErrors] = useState({
        title: '',
        description: ''
    })

    useEffect(() => {
        if (id) {
            retrieveSpecificTodo(id)
                .then(response => {
                    setTitle(response.data.title)
                    setDescription(response.data.description)
                    setCompleted(response.data.completed)
                })
                .catch(error => console.log(error))
        }
    }, [id])

    function saveOrUpdateTodo(event) {
        event.preventDefault()

        if(validateForm()){
            const todo = { title, description, completed }
    
            if (id) {
                updateExistingTodo(todo, id)
                    .then(navigate('/todos'))
                    .catch(error => console.error(error))
            } else {
                createTodo(todo)
                    .then(navigate('/todos'))
                    .catch(error => console.error(error))
            }
        }
    }

    function validateForm(){
        let valid = true

        const errorsCopy = {... errors}

        if(title.trim()){
            errorsCopy.title = ''
        } else {
            errorsCopy.title = 'Title field is required'
            valid = false
        }

        if(description.trim()){
            errorsCopy.description = ''
        } else {
            errorsCopy.description = 'Description field is required'
            valid = false
        }

        setErrors(errorsCopy)

        return valid
    }

    function pageTitle() {
        if(id){
            return <p className="fw-light text-center mt-2 fs-1">Update Todo</p>
        } else{
            return <p className="fw-light text-center mt-2 fs-1">Add Todo</p>
        }
    }

    return (
        <div>
            <div className="container">
                <div className="row mt-5">
                    <div className="card col-md-4 offset-md-4 offset-md-4 mt-5">
                        {pageTitle()}
                        <hr />
                        <div className="card-body">
                            <form>
                                <div className="form-group mb-2">
                                    <label className="form-label">Title</label>
                                    <input
                                        type="text"
                                        placeholder="Todo title"
                                        name="title"
                                        className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                                        value={title}
                                        onChange={(event) => setTitle(event.target.value)}
                                    />
                                    {errors.title && <div className="invalid-feedback">{errors.title}</div>}
                                </div>
                                <div className="form-group mb-2">
                                    <label className="form-label">Description</label>
                                    <input
                                        type="text"
                                        placeholder="Todo desciption"
                                        name="description"
                                        className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                                        value={description}
                                        onChange={(event) => setDescription(event.target.value)}
                                    />
                                    {errors.description && <div className="invalid-feedback">{errors.description}</div>}
                                </div>
                                <div className="form-group mb-2">
                                    <label className="form-label">Completed</label>
                                    <select
                                        className="form-control"
                                        value={completed}
                                        onChange={(event) => setCompleted(event.target.value)}
                                    >
                                        <option value='false'>No</option>
                                        <option value='true'>Yes</option>
                                    </select>
                                </div>
                                <button className="btn btn-info mt-3 w-100" onClick={(event) => saveOrUpdateTodo(event)}>Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TodoComponent