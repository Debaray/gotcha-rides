import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from "../../App";
import './Header.css';

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <h1 className="navbar-brand" >Gotcha Rides</h1>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                        <div className="navbar-nav d-flex justify-content-center align-items-center">
                            <Link className="nav-link" to="/home">Home</Link>
                            <Link className="nav-link" to="/ride/bike">Destination</Link>
                            <Link className="nav-link" to="/blog">Blog</Link>
                            <Link className="nav-link" to="/contact">Contact</Link>
                            {
                                loggedInUser.email? `${loggedInUser.displayName}`:
                                <Link className="nav-link" to="/login"><button className="btn btn-default">LogIn</button></Link>
                            }
                            
                            <button className="btn btn-default nav-link" onClick={() => setLoggedInUser({})}>Sign out</button>
                        </div>

                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Header;