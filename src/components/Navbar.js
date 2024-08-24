import React, { useEffect, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [book, setBook] = useState('');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate("/login");
  }

  useEffect(() => {
    // You can add any effect that needs to run on location change here
  }, [location]);

  const onChange = (e) => {
    setBook(e.target.value);
  };

  const onSearch = (e) => {
    e.preventDefault();
    navigate('/Search', { state: { searchTerm: book } });
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">StoryVerse</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/About" ? "active" : ""}`} to="/About">About</Link>
            </li>
          </ul>
          {!localStorage.getItem('token') ? (
            <>
              <Link className="btn btn-primary mx-2" to="/Signup" role="button">Sign up</Link>
              <Link className="btn btn-primary" to="/Login" role="button">Login</Link>
            </>
          ) : (
            <>
              <form className="d-flex mx-3" role="search" onSubmit={onSearch}>
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={book} onChange={onChange} />
                <button className="btn btn-outline-success" type="submit">Search</button>
              </form>
              <Link to="/Profile"><i className="fa-regular fa-user"></i></Link>
              <Link className="btn btn-primary mx-2" to="/Write" role="button">Write</Link>
              <button className='btn btn-primary' onClick={handleLogout}>Logout</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
