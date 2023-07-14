import { useState } from "react"

const TodoComponent = () => {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [completed, setCompleted] = useState('')

    function saveTodo(event){
        event.preventDefault()
        const todo = {title, description, completed}
        console.log(todo);
    }

    return (
        <div>
            <div className="container">
                <div className="row mt-5">
                    <div className="card col-md-4 offset-md-4 offset-md-4 mt-5">
                        <p className="fw-light text-center p-2 fs-3">Add Todo</p>
                        <hr />
                        <div className="card-body">
                            <form>
                                <div className="form-group mb-2">
                                    <label className="form-label">Title</label>
                                    <input
                                        type="text"
                                        placeholder="Todo title"
                                        name="title"
                                        className="form-control"
                                        value={title}
                                        onChange={(event) => setTitle(event.target.value)}
                                    />
                                </div>
                                <div className="form-group mb-2">
                                    <label className="form-label">Description</label>
                                    <input
                                        type="text"
                                        placeholder="Todo desciption"
                                        name="description"
                                        className="form-control"
                                        value={description}
                                        onChange={(event) => setDescription(event.target.value)}
                                    />
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
                                <button className="btn btn-info mt-3 w-100" onClick={(event) => saveTodo(event)}>Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TodoComponent