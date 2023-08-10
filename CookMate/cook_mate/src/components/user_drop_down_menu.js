// import { useState } from 'react';
// import ErrorBoundary from '../ErrorBoundary';
// import { Link } from 'react-router-dom';

// const User_menu = (props) => {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <div className="user-menu">
//       <button className="user-menu-button" onClick={toggleMenu}>
//         User Menu
//       </button>
//       {isOpen && (
//         <ul className="user-menu-list">
//           <ErrorBoundary>
//             <li>
//               <Link to="/my-account" > My Account</Link>
//             </li>
//           </ErrorBoundary>
//           <ErrorBoundary>
//             <li>
//               {/* <a href={`/user${props.user_id}/favorites`}>Favorites</a> */}
//               <Link to={`/favorites/user-${props.user_id}`} > Favorites</Link>
//             </li>
//           </ErrorBoundary>
//           <ErrorBoundary>
//             <li>
//               <Link to="/"  onClick={props.user_log_out}> Log Out</Link>
//               {/* <a href="/" onClick={props.user_log_out}>Log Out</a> */}
//             </li>
//           </ErrorBoundary>
//         </ul>
//       )}
//     </div>
//   );
// };

// export default User_menu;

import { useState } from 'react';
import ErrorBoundary from '../ErrorBoundary';
import { Link } from 'react-router-dom';
// import './UserMenu.css'; // Import the CSS file

const User_menu = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="user-menu-container">
      <button className="user-menu-button" onClick={toggleMenu}>
        User Menu
      </button>
      {isOpen && (
        <ul className="user-menu-list">
          {/* <ErrorBoundary>
            <li>
              <Link to="/my-account">My Account</Link>
            </li>
          </ErrorBoundary> */}
          <ErrorBoundary>
            <li>
              <Link to={`/favorites/user-${props.user_id}`}>Favorites</Link>
            </li>
          </ErrorBoundary>
          <ErrorBoundary>
            <li>
              <Link to="/" onClick={props.user_log_out}>Log Out</Link>
            </li>
          </ErrorBoundary>
        </ul>
      )}
    </div>
  );
};

export default User_menu;

