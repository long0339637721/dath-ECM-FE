import { Routes, Route } from "react-router-dom"
import App_admin from "./admin/App_admin"
import App_manager from "./manager/App_manager"
import App_teacher from "./teacher/App_teacher"
import Login from "./components/login"
import './App.css';
import "./components/styles.css"

function App() {

  return (
  <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin/*" element={<App_admin />} />
        <Route path="/manager/*" element={<App_manager />} />
        <Route path="/teacher/*" element={<App_teacher />} />
      </Routes>
  </>
  )
}

export default App