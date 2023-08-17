import { Link, useMatch, useResolvedPath } from "react-router-dom"

export default function Navbar() {
  return (
    <nav className="nav" style={{display:'block', padding:"0 1rem"}}>
      <ul>
        <CustomLink to="/admin">Admin</CustomLink>
        <CustomLink to="/manager">Manager</CustomLink>
        <CustomLink to="/teacher">Teacher</CustomLink>
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