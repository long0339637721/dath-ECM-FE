import Navbar from "./Navbar"
import Teacher from "./Teacher/Teacher"
import Calender from "./Calender/Calender"
import Attendance from "./Attendance/Attendance"
import Student from "./Student/Student"
import Class from "./Class/Class"
import AddClass from "./Class/AddClass"
import '../App.css';
import "../styles.css"

import { Route, Routes } from "react-router-dom"

function App_admin() {
  return (
    <div style={{display: "flex", flexDirection: "row"}}>
      <Navbar />
      <div className="body">
        <div className="header">
          <div className="logo">
            <h1>English Center Management</h1>
          </div>
          <div className="icon1">
            <i className="bi bi-question-circle" />
            <i className="bi bi-gear" />
            <i className="bi bi-bell" />
            <h6>Hello, Admin</h6>
            <i className="bi bi-person" style={{ fontSize: "110%" }} />
          </div>
        </div>
          <div className="container">
            <Routes>
              <Route path="/" element={<Calender />} />
              <Route path="/calender" element={<Calender />} />
              <Route path="/attendance" element={<Attendance />} />
              <Route path="/class" element={<Class />} />
              <Route path="/addclass" element={<AddClass />} />
              <Route path="/teacher" element={<Teacher />} />
              <Route path="/student" element={<Student />} />
            </Routes>
          </div>
      </div>
    </div>
  )
}

export default App_admin