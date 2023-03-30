import Navbar from "./Navbar"
import App_admin from "./admin/App_admin"
import App_manager from "./manager/App_manager"
import App_teacher from "./teacher/App_teacher"
import './App.css';
import "./styles.css"

import { Route, Routes } from "react-router-dom"

function App() {
  return (
    // <>
    //   <Navbar />
    //   <div className="container">
    //     <Routes>
    //       <Route path="/admin" element={<App_admin />} />
    //       <Route path="/manager" element={<App_manager />} />
    //       <Route path="/teacher" element={<App_teacher />} />
    //     </Routes>
    //   </div>
    // </>
    <>
      <App_admin />
      {/* <App_manager />
      <App_teacher /> */}
    </>
    
  )
}

export default App