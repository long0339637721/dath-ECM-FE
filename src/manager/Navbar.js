import { Link, useMatch, useResolvedPath } from "react-router-dom"
import "./Navbar.css";
export default function Navbar() {
  return (
    <nav className="nav">
      <ul>
        <div className="logo">
          <img src="http://localhost:3000/logoECM.png" alt="logo"/>
        </div>

        <div className = "nameItem" style={{color:'blue'}}>Homepage</div>
        <CustomLink to="/manager" >Calender</CustomLink>
        
        
        {/* <div className = "nameItem" style={{color:'blue'}}>Attendance</div> */}
        <CustomLink to="/manager/attendance" >Attendance</CustomLink>
        
        <div className = "nameItem" style={{color:'blue'}}>Presence</div>
        <CustomLink to="/manager/present_teacher" >Teacher</CustomLink>
        <CustomLink to="/manager/present_student" >Student</CustomLink>
        
        <div className = "nameItem" style={{color:'blue'}}>Manage</div>
        <CustomLink to="/manager/class" >Class</CustomLink>

        <div className = "nameItem" style={{color:'blue'}}>Teams</div>
        <CustomLink to="/manager/teacher" >Teacher</CustomLink>
        <CustomLink to="/manager/student" >Student</CustomLink>
      </ul>
    </nav>
  )
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  )
}