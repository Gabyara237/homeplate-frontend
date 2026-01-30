import { Link, NavLink } from 'react-router';
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import './navbar.css'
import HomeIcon from '../icons/HomeIcon';
import Profile from '../icons/Profile';
import Food from '../icons/Food';
import SignOut from '../icons/SignOut';
import Follow from '../icons/Follow';
import Add from '../icons/Add';

const NavBar = () => {


  const { setUser } = useContext(UserContext);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <nav className='sidebar'>
  
        <ul className='ul-nav'>
          <li className="nav-logo"><h2 className="logo">HomePlate</h2></li>
          <li className='nav-list'>
            <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link" } to="/">
              <HomeIcon className="icon" /> Home
            </NavLink>
          </li>

          <li className='nav-list'>
            <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link" } to="/profile">
              <Profile className="icon" /> Profile
            </NavLink>
          </li>

          <li className='nav-list'>
            <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link" } to="/recipes/new">
            <Add className="icon"/>  Add New Recipe
            </NavLink>
          </li>

          <li className='nav-list'>
            <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link" } to="/my-recipes">
            <Food className="icon"/>  My Recipes
            </NavLink>
          </li>

          <li className='nav-list'>
            <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link" } to="/followers">
            <Follow className="icon"/>  Followers & Following
            </NavLink>
          </li>

          <li className='nav-list'>
            <Link className="nav-link"  to="/" onClick={handleSignOut}>
              <SignOut className="icon"/> Sign Out
            </Link>
          </li>

        </ul>
    </nav>
  );
};

export default NavBar;
