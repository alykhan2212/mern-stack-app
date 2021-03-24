import { Link } from 'react-router-dom';
import { useState } from 'react';

function Navbar() {

  const [showMenu, setMenu] = useState({ showCollapsedMenu: false });
  const show = (showMenu.showCollapsedMenu) ? "show" : "";

  function toggleMenu() {
    setMenu({
      showCollapsedMenu: !showMenu.showCollapsedMenu
    })
  }

  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
      <Link to="/" className="navbar-brand">Blog</Link>
      <button
        className="navbar-toggler"
        type="button"
        onClick={toggleMenu}
        data-toggle="collapse"
        data-target="#navbarNav">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className={"collapse navbar-collapse " + show} id="navbarNav">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li className="navbar-item">
            <Link to="/create" className="nav-link">Create Post</Link>
          </li>
        </ul>
      </div>
    </nav>

  );
}

export default Navbar;
