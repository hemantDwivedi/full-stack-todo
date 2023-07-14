import HeaderComponent from './component/HeaderComponent'
import FooterComponent from './component/FooterComponent'
import ListTodoComponent from './component/ListTodoComponent'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import TodoComponent from './component/TodoComponent'

function App() {
  return (
    <>
      <BrowserRouter>
        <HeaderComponent />
      <Routes>
        <Route path='/' element={<ListTodoComponent />} />
        <Route path='/todos' element={<ListTodoComponent />} />
        <Route path='/add-todo' element={<TodoComponent />} />
        <Route path='/update-todo/:id' element={<TodoComponent />} />
      </Routes>
        <FooterComponent />
      </BrowserRouter>
    </>
  )
}

export default App