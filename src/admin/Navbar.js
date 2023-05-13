import { Link, useMatch, useResolvedPath } from "react-router-dom"

export default function Navbar() {
  return (
    <div style={{background: '#333'}}>
      <nav className="nav">
        <ul>
          <div className="logo">
            <img src="http://localhost:3000/logoECM.png" alt="logo"/>
          </div>
          <CustomLink to="/admin/">Calender</CustomLink>
          <CustomLink to="/admin/class">Class</CustomLink>
          {/* <CustomLink to="/class/addclass">Add Class</CustomLink> */}
          <CustomLink to="/admin/teacher">Teacher</CustomLink>
          <CustomLink to="/admin/student">Student</CustomLink>
          <CustomLink to="/admin/attendance">Presence</CustomLink>
        </ul>
      </nav>
    </div>
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