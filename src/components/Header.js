import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="navbar navbar-light" style={{backgroundColor: '#e3f2fd'}}>
      <Link to="/" className="item">
        Home
      </Link>
      <div className="right menu">
        <Link to="/" className="item">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Header;
