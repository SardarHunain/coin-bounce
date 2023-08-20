import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

export default function Navbar() {
  const isAuthenticated = false;
  return (
    <>
    <nav className="navbar navbar-expand-lg bg-black main">
      <div className="container-fluid">
        <Link className="navbar-brand text-light" to="/">CoinBounce</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link className="nav-link active text-light" aria-current="page" to="/">Home</Link>
            <Link className="nav-link text-light" to="crypto">Cryptocurrencies</Link>
            <Link className="nav-link text-light" to="blogs">Blogs</Link>
            <Link className="nav-link text-light" to="submit">Submit a Blog</Link>
          </div>
        </div>
        {isAuthenticated?<div className="d-flex">
          <Link className="nav-link text-light mx-2" to="log-in">
            <button type="button" className="btn btn-danger">LogOut</button>
          </Link>
          
        </div>:<div className="d-flex">
          <Link className="nav-link text-light mx-2" to="login">
            <button type="button" className="btn btn-info">LogIn</button>
          </Link>
          <Link className="nav-link text-light mx-2" to="signup">
            <button type="button" className="btn btn-warning">SignUp</button>
          </Link>
        </div>}
      </div>
    </nav>
    <div className={styles.separator}>

    </div>
    </>
  );
}
