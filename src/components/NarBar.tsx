import {Link} from 'react-router-dom'

const NarBar = ()=> {

    const username = localStorage.getItem("username")

    return (
        <>
            <nav>
        <div className="container">
            <div className="logo">
                <i className="fas fa-globe fa-3x"></i>
                <h1>News<span>API</span></h1>
            </div>

            <div className="social">
                <a href="https://web.facebook.com/" target="_blank"><i className="fab fa-facebook fa-2x"></i></a>
                <a href="https://www.twitter.com/" target="_blank"><i className="fab fa-twitter fa-2x"></i></a>
                <a href="https://www.instagram.com/" target="_blank"><i className="fab fa-instagram fa-2x"></i></a>
                <a href="https://www.youtube.com/" target="_blank"><i className="fab fa-youtube fa-2x"></i></a>
            </div>

            <div className="options">
            <Link to="/" className='current'>Home</Link>
            {username ? (
                <Link to="/logout">Logout</Link>
            ): (
                <Link to="/login">Login</Link>
            )}
            </div>
        </div>
    </nav>
        </>
    )
}

export default NarBar;