import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import Table from "./Table"
import UrlShortener from "./UrlShortener"
import useAuth from "../hooks/useAuth"

const Home = () => {
    const { setAuth } = useAuth()

    const navigate = useNavigate();

    const logout =  () => {
        setAuth({});
        localStorage.setItem("jwt", "");
        localStorage.setItem("user", "");
        navigate('/login');
    }

    return (
        <section>
            <h1>Home</h1>
            <br />
            <p>You are logged in!</p>
            <br />
            <div className="flexGrow">
                <button onClick={logout}>Sign Out</button>
            </div>
            <article className="table">
                <Table />
            </article>
            <article className="shortener">
                <UrlShortener />
            </article>
        </section>
    )
}

export default Home