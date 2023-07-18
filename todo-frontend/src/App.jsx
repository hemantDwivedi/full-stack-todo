import HeaderComponent from './component/HeaderComponent'
import FooterComponent from './component/FooterComponent'
import ListTodoComponent from './component/ListTodoComponent'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import TodoComponent from './component/TodoComponent'
import RegisterComponent from './component/RegisterComponent'
import LoginComponent from './component/LoginComponent'
import { isUserLoggedIn } from './service/AuthApiService'

function App() {

  function AuthenticatedRoute({children}){
    const isAuthenticated = isUserLoggedIn()

    if(isAuthenticated){
      return children
    }
    return <Navigate to="/" />
  }

  return (
    <>
      <BrowserRouter>
        <HeaderComponent />
      <Routes>
        <Route path='/' element={<LoginComponent />} />
        <Route path='/todos' element={
        <AuthenticatedRoute>
          <ListTodoComponent />
        </AuthenticatedRoute>
        } />
        <Route path='/add-todo' element={
        <AuthenticatedRoute>
          <TodoComponent />
        </AuthenticatedRoute>
        } />
        <Route path='/update-todo/:id' element={
        <AuthenticatedRoute>
          <TodoComponent />
        </AuthenticatedRoute>
        } />
        <Route path='/register' element={<RegisterComponent />} />
        <Route path='/login' element={<LoginComponent />} />
      </Routes>
        <FooterComponent />
      </BrowserRouter>
    </>
  )
}

export default App