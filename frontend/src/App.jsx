import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {Routes,Route} from "react-router-dom"
import { AssignmentList } from './pages/AssignmentList'
import {AssignmentPage} from './pages/AssignmentPage'
function App() {
  

  return (
    <Routes>
      <Route path='/' element= {<AssignmentList/>}></Route>
      <Route path='/assignment/:id' element={<AssignmentPage/>}></Route>
    </Routes>
  )
}

export default App
