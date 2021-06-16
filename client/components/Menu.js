import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch, connect } from 'react-redux';

import { logout } from '../redux/actions/userActions';

import '../stylesheets/componentStyles/Menu.css';

const Menu = ({ show, click }) => {
  // create a var to an array with an element ['menu']
  const menuClass = ['menu'];
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogOut = () => {
    dispatch(logout(history));
    // logout({
    //   history
    // }, dispatch);
  };

  if(show) {
    menuClass.push('show');
  }

  // {menuClass.join(' ')}
  return (
    <div className={menuClass.join(' ')} onClick={click}>
      <ul className="menu__links" >
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
        <li>
          <button onClick={handleLogOut}>
              Sign Out
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
