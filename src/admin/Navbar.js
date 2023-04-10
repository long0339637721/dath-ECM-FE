import { Link, useMatch, useResolvedPath } from "react-router-dom"

export default function Navbar() {
  return (
    <nav className="nav">
      <ul>
        <div className="logo">
          <img src="logoECM.png" alt="logo"/>
        </div>
        <CustomLink to="/calender">Calender</CustomLink>
        <CustomLink to="/class">Class</CustomLink>
        <CustomLink to="/addclass">Add Class</CustomLink>
        <CustomLink to="/teacher">Teacher</CustomLink>
        <CustomLink to="/student">Student</CustomLink>
        <CustomLink to="/attendance">Attendance</CustomLink>
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