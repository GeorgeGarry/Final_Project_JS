import './App.css';
import './login_register.css';
import Choice_menu from './components/choice_menu';
// import Login_button from './components/login_button';
// import Register_button from './components/register_button';
import { Routes, Route, Link } from 'react-router-dom';
import AI_page_button from './components/ai_page_button';
import AI_recipe_page from './components/ai_recipe_page';
import './choice_menu.css';
import ErrorBoundary from './ErrorBoundary';
import Register_form from './components/register_form';
import Login_form from './components/login_form';
import { useState } from 'react';
import User_menu from './components/user_drop_down_menu';
import { useEffect } from 'react'
import Favorites_page from './components/favorites_page'
import About from './components/about';


function App() {
  const [seen, setSeen] = useState(false);
  const [username_logged_in, setUsername_logged_in] = useState('');
  const [logged_user_id, setLogged_user_id] = useState('');
  const [user_favorite_path, setUser_favorite_path] = useState('')
  const togglePop = () => {
    console.log("togglePop clicked");
    setSeen(!seen);
  };
  const user_logged_in = (user_data) => {
    setUsername_logged_in(user_data.username);
    setLogged_user_id(user_data.id);
    localStorage.setItem('username', user_data.username);
    localStorage.setItem('user_id', user_data.id);
    console.log(logged_user_id);
    console.log("Welcome", username_logged_in);
  };


  const user_log_out = () => {
    localStorage.setItem('username', '');
    localStorage.setItem('user_id', '');
    setUsername_logged_in('');
    setLogged_user_id('');
  };


  useEffect(() => {
    const stored_username = localStorage.getItem('username');
    const stored_user_id = localStorage.getItem('user_id');
    if (stored_username && stored_user_id) {
      setUsername_logged_in(stored_username);
      setLogged_user_id(stored_user_id);
      setUser_favorite_path(`/favorites`)
    }
  }, []);
  return (
    <div className="App">
      <header className="App-header">

        {/* <nav>
          <ErrorBoundary>
            <Link to="/about" > About</Link>
          </ErrorBoundary>
          <ErrorBoundary>
            <Link to="/" > Home</Link>
          </ErrorBoundary>
          <ErrorBoundary>
            <Link to="/AI" > AI recipe generator</Link>
          </ErrorBoundary>
          <ErrorBoundary>
            {username_logged_in == '' && <Link to="/register" onClick={togglePop} > Register</Link>}
          </ErrorBoundary>
          <ErrorBoundary>
            {username_logged_in == '' && <Link to="/login" onClick={togglePop}  > Login</Link>}
          </ErrorBoundary>
          <ErrorBoundary>
            {username_logged_in != '' && <div>
              <p>Welcome {username_logged_in}</p>
              <User_menu user_log_out={user_log_out} user_id={logged_user_id} />
            </div>}
          </ErrorBoundary>


        </nav> */}
        <nav className="nav-menu"> {/* Added "nav-menu" class */}
          <ErrorBoundary>
            <Link className="nav-link" to="/about"> About</Link> {/* Added "nav-link" class */}
          </ErrorBoundary>
          <ErrorBoundary>
            <Link className="nav-link" to="/"> Home</Link> {/* Added "nav-link" class */}
          </ErrorBoundary>
          <ErrorBoundary>
            <Link className="nav-link" to="/AI"> AI recipe generator</Link> {/* Added "nav-link" class */}
          </ErrorBoundary>
          <ErrorBoundary>
            {username_logged_in === '' && (
              <Link className="nav-link" to="/register" onClick={togglePop}> Register</Link>
            )}
          </ErrorBoundary>
          <ErrorBoundary>
            {username_logged_in === '' && (
              <Link className="nav-link" to="/login" onClick={togglePop}> Login</Link>
            )}
          </ErrorBoundary>
          <ErrorBoundary>
            {username_logged_in !== '' && (
              <div className="user-info">
                <p className="user-welcome">Welcome {username_logged_in}</p>
                <User_menu className="user-menu" user_log_out={user_log_out} user_id={logged_user_id} />
              </div>

            )}
          </ErrorBoundary>
        </nav>
      </header>
      <body>

        <ErrorBoundary>
          <Routes>
            <Route path='/register' element={seen ? <Register_form toggle={togglePop} /> : null} />
            <Route path='/login' element={seen ? <Login_form toggle={togglePop} user_logged_in={user_logged_in} /> : null} />
            <Route path='/' element={<Choice_menu user_id={logged_user_id} />} />
            <Route path='/AI' element={<AI_recipe_page />} />
            <Route path='/about' element={<About />} />
            <Route path={`/favorites/user-${logged_user_id}`} element={<Favorites_page user_id={logged_user_id} />} />
          </Routes>
        </ErrorBoundary>



      </body>
    </div>
  );
}

export default App;
