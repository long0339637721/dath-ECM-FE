import Navbar from "./Navbar"
import Footer from "../components/footer"
import Teacher from "./Teacher/Teacher"
import Calender from "./Calender/Calender"
import Attendance from "./Attendance/Attendance"
import Student from "./Student/Student"
import AddClass from "./Class/AddClass"
import Class from "../components/class/Class"
import ClassInfor from "../components/class/ClassInfor"
import { useState, useEffect } from 'react'
import '../App.css';
import "../components/styles.css"
import { ReactNotifications } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'

import { Route, Routes } from "react-router-dom"

function App_admin() {

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleLogout = () => {
    localStorage.clear()
    window.location.pathname = '/'
  }
  
  if (localStorage.getItem("token")){
    if (localStorage.getItem("role") != "Admin"){
      const url = '/' + localStorage.getItem("role")
      return (
        <div style={{display:'flex', flexDirection:'column', alignItems:'center', margin: '2rem'}}>
          <h1>You don't have permission to access this website</h1>
          <button style={{marginTop:'1rem'}} onClick={() => {
            window.location.pathname = '/';
          }}>Go to login page</button>
          <button style={{marginTop:'1rem'}} onClick={() => {
            window.location.pathname = url;
          }}>Go to {localStorage.getItem("role")} page</button>
        </div>
      )
    }
  } else {
    return (
      <div style={{display:'flex', flexDirection:'column', alignItems:'center', margin: '2rem'}}>
        <h1>Please login to access</h1>
        <button style={{marginTop:'1rem'}} onClick={() => {
          window.location.pathname = '/';
        }}>Go to login page</button>
      </div>
    )
  }

  return (
    <div>
      <ReactNotifications />
      <div style={{display: "flex", flexDirection: "row", minHeight: "560px"}}>
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
              {/* <i className="bi bi-person" style={{ fontSize: "110%" }} /> */}
              <div className="menu-container" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <i className="bi bi-person" style={{ fontSize: "110%" }} />
                {isHovered && (
                  <div className="dropdown">
                    <button 
                      className="dropdown-button"
                      style={{padding:'3px', paddingBottom:'5px', margin:'0'}}
                      onClick={() => alert("This function is not supported yet")}
                    >Profile</button>
                    <button 
                      className="dropdown-button"
                      style={{padding:'3px', paddingBottom:'5px', margin:'0'}}
                      onClick={() => handleLogout()}
                    >Logout</button>
                  </div>
                )}
              </div>
            </div>
          </div>
            <div className="container">
              <Routes>
                <Route path="/" element={<Calender />} />
                <Route path="/attendance" element={<Attendance />} />
                <Route path="/class" element={<Class />} />
                <Route path="/class/addclass" element={<AddClass />} />
                <Route path="/teacher" element={<Teacher />} />
                <Route path="/student" element={<Student />} />
                <Route path="/infor/*" element={<ClassInfor />} />
              </Routes>
            </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default App_admin