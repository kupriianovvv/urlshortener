import { Outlet } from "react-router-dom"
import { Link } from "react-router-dom"
const Layout = () => {
    return (
        <main className="App">
            <nav>
                <Link to="/">Home</Link>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
            </nav>
            <Outlet />
        </main>
    )
}

export default Layout