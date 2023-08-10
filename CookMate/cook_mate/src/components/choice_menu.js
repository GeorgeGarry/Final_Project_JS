

import { useState } from 'react';
import Recipe_card from './recipe_card';

const Choice_menu = (props) => {
  const user_id = props.user_id
  const [dish_type, setDish_type] = useState('');
  const [add_food, setAdd_food] = useState([]);
  const [exclude_food, setExclude_food] = useState([]);
  const [dish_name, setDish_name] = useState('');
  const [cook_time, setCook_time] = useState(99999);
  const [meal_type, setMeal_type] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [results_number, setResults_number] = useState(1);
  const [response_cards, setReponse_cards] = useState([]);
  const [received_response, setReceived_response] = useState(false);

  const send_input_data = async () => {
    setReceived_response(false);
    const request_options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        dish_type,
        dish_name,
        cook_time,
        meal_type,
        cuisine,
        results_number,
        add_food,
        exclude_food
      })
    };
    try {
      const response = await fetch('http://localhost:3030', request_options);
      const data = await response.json();
      setReponse_cards(data);
      setReceived_response(true);
    } catch (error) {
      // Handle any errors that occur during the request
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Generate your recipe</h1>
      <div className="row">
        <div className="col">
          <div className="form-group">
            <label htmlFor="food_query">Desired type:</label>
            <input
              type="text"
              className="form-control"
              id="food_query"
              placeholder="Kind of food you like"
              onChange={(e) => setDish_type(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="add_food">Add food:</label>
            <input
              type="text"
              className="form-control"
              id="add_food"
              placeholder="Include ingredients"
              onChange={(e) => setAdd_food(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exclude_food">Exclude:</label>
            <input
              type="text"
              className="form-control"
              id="exclude_food"
              placeholder="Exclude ingredients"
              onChange={(e) => setExclude_food(e.target.value)}
            />
          </div>
        </div>
        <div className="col">
          <div className="form-group">
            <label htmlFor="dish_title">I know the name:</label>
            <input
              type="text"
              className="form-control"
              id="dish_title"
              placeholder="Fill in if you know the name of the dish"
              onChange={(e) => setDish_name(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="time_cooking">How much time do you have?</label>
            <select
              className="form-control"
              id="time_cooking"
              onChange={(e) => setCook_time(e.target.value)}
            >
              <option value="99999">I have plenty of time</option>
              <option value="10">10 minutes</option>
              <option value="30">30 minutes</option>
              <option value="60">1 hour</option>
              <option value="120">2 hours</option>
              <option value="180">3 hours</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="meal_type">Food type</label>
            <select
              className="form-control"
              id="meal_type"
              onChange={(e) => setMeal_type(e.target.value)}
            >
              <option value="">Any</option>
              <option value="antipasti">Antipasti</option>
              <option value="antipasto">Antipasto</option>
              <option value="appetizer">Appetizer</option>
              <option value="beverage">Beverage</option>
              <option value="breakfast">Breakfast</option>
              <option value="brunch">Brunch</option>
              <option value="condiment">Condiment</option>
              <option value="dessert">Dessert</option>
              <option value="dip">Dip</option>
              <option value="drink">Drink</option>
              <option value="fingerfood">Finger Food</option>
              <option value="hor-doeuvre">Hors d'oeuvre</option>
              <option value="main-course">Main Course</option>
              <option value="marinade">Marinade</option>
              <option value="morning-meal">Morning Meal</option>
              <option value="salad">Salad</option>
              <option value="sauce">Sauce</option>
              <option value="seasoning">Seasoning</option>
              <option value="side-dish">Side Dish</option>
              <option value="snack">Snack</option>
              <option value="soup">Soup</option>
              <option value="spread">Spread</option>
              <option value="starter">Starter</option>
              <option value="marinade">Marinade</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="cuisine_select">Choose cuisine</label>
            <select
              className="form-control"
              id="cuisine_select"
              onChange={(e) => setCuisine(e.target.value)}
            >
              <option value="">All</option>
              <option value="American">American</option>
              <option value="Asian">Asian</option>
              <option value="Cajun">Cajun</option>
              <option value="Chinese">Chinese</option>
              <option value="Creole">Creole</option>
              <option value="European">European</option>
              <option value="French">French</option>
              <option value="Indian">Indian</option>
              <option value="Italian">Italian</option>
              <option value="Latin American">Latin American</option>
              <option value="Mediterranean">Mediterranean</option>
              <option value="Mexican">Mexican</option>
              <option value="South American">South American</option>
              <option value="Southern">Southern</option>
              <option value="Thai">Thai</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="results_on_page">How many recipes?</label>
            <select
              className="form-control"
              id="results_on_page"
              onChange={(e) => setResults_number(e.target.value)}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
        </div>
      </div>
      <div className="text-center">
        <button className="btn btn-primary" onClick={() => send_input_data()}>
          Look for food!
        </button>
      </div>
      {received_response && <Recipe_card cards={response_cards} user_id={user_id} />}
    </div>
  );
};

export default Choice_menu;
