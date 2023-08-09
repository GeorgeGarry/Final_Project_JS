import { useState } from 'react';

const User_menu = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="user-menu">
      <button className="user-menu-button" onClick={toggleMenu}>
        User Menu
      </button>
      {isOpen && (
        <ul className="user-menu-list">
          <li>
            <a href="/my-account">My Account</a>
          </li>
          <li>
            <a href="/favorites">Favorites</a>
          </li>
          <li>
            <a href="/" onClick={props.user_log_out()}>Log Out</a>
          </li>
        </ul>
      )}
    </div>
  );
};

export default User_menu;
