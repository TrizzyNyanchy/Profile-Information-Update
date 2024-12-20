import logo from './logo.svg';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css';


// components (views / pages)

//auth
import Login from './pages/auth/login';
//restaurants
import RestaurantList from './pages/restaurant/list';
import RestaurantAdd from './pages/restaurant/add'
import RestaurantEdit from './pages/restaurant/edit';
// home
import HomePage from './pages/landing/home';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/restaurants" element={<RestaurantList />} />
        <Route exact path="/restaurant/add" element={<RestaurantAdd />} />
        <Route exact path="/restaurant/edit/:RestaurantID" element={<RestaurantEdit />} />
      </Routes>
    </Router>
  );
}

export default App;
