import React, { useState } from 'react';
import '../../styles/components/header.css';

const Header = ({ user, onLogout }) => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => setShowMenu(!showMenu);

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">Fiber Optic GIS</div>
        <div className="user-menu" onClick={toggleMenu}>
          <span>{user.username} ▼</span>
          {showMenu && (
            <div className="dropdown-menu">
              <button onClick={onLogout}>Logout</button>
              <button>Settings</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
