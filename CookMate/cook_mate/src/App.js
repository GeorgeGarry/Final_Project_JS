// import logo from './logo.svg';
import './App.css';
import './login_register.css';
import Choice_menu from './components/choice_menu';
import Login_button from './components/login_button';
import Register_button from './components/register_button';
import { Routes, Route, Link } from 'react-router-dom';
import AI_page_button from './components/ai_page_button';
import AI_recipe_page from './components/ai_recipe_page';
import './choice_menu.css';

// import ReactDOM from 'react-dom';
// import { Link } from 'react-router-dom';

// const Navigation = () => {
//   return (
//     <nav>
//       <ul>
//         <li>
//           <Link to="/">Home</Link>
//         </li>
//         <li>
//           <Link to="/about">About</Link>
//         </li>
//       </ul>
//     </nav>
//   );
// };




function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Login_button/>
        <Register_button/>
        <nav>
        <Link to="/" > Home</Link>
        <Link to="/AI" > AI recipe generator</Link>
      </nav>
      </header>
      {/* <Navigation/> */}
      {/* <Choice_menu/> */}
      <Routes>
        <Route path='/' element={ <Choice_menu/>}/>
        <Route path='/AI' element={<AI_recipe_page/>}/>
      </Routes>
      
      <body>
        
      </body>
    </div>
  );
}

export default App;
