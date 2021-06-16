import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { logout } from '../redux/actions/userActions';

import '../stylesheets/componentStyles/Menu.css';


const Menu = ({ show, click }) => {
  const menuClass = ['menu'];
  const dispatch = useDispatch();
  const history = useHistory();
  const AUTH_TOKEN = localStorage.getItem('authToken');
  
  const handleLogOut = () => dispatch(logout(history));

  if (show) menuClass.push('show');

  return (
    <div className={menuClass.join(' ')} onClick={click}>
      <ul className="menu__links" >
        {AUTH_TOKEN ? (
          <li>
            <button onClick={handleLogOut}>
                Sign Out
            </button>
          </li>
        ) : (
          <>
            <li>
              <Link to="/">
                Log In
              </Link>
            </li>
            <li>
              <Link to="/signup">
                  Sign Up
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Menu;
