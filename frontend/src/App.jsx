
import {Routes,Route} from "react-router-dom"
import { AssignmentList } from './pages/AssignmentList'
import {AssignmentPage} from './pages/AssignmentPage'
import { Login } from './pages/Login'
import { Signup } from './pages/Signup'
import { Navbar } from './components/Navbar'


function App() {
  
  return (
    <>
    <Navbar />
    <Routes>
      <Route path='/' element= {<AssignmentList/>}></Route>
      <Route path='/assignment/:id' element={<AssignmentPage/>}></Route>
      <Route path='/login' element = {<Login/>} ></Route>
      <Route path="/signup" element={<Signup />}></Route>
    </Routes>
    </>
    
  )
}

export default App
