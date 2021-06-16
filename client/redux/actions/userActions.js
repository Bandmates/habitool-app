import axios from 'axios';
import Cookie from 'js-cookie';
import {
  USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL, USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USER_LOGOUT
} from '../constants/userConstants';

const signin = async (email, password, history, dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST });

  try {
    const { data } = await axios.post('/login', { email, password });
    debugger
    const {
      user: {
        email: newEmail,
        fullName,
        habit,
      },
      token,
      success,
    } = data;
    localStorage.setItem('authToken', token);
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: { email: newEmail, fullName, habit} });
    history.push('/dashboard');
    // Cookie.set('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({ type: USER_SIGNIN_FAIL, payload: error.message });
  }
};

const register = (name, email, password, history) => async (dispatch) => {
  dispatch({ type: USER_REGISTER_REQUEST });

  try {
    const { data } = await axios.post('/signup', { name, email, password });
    const { token, success } = data;

    const actionPayload = { email, fullName: name };
    localStorage.setItem('authToken', token);
    dispatch({ type: USER_REGISTER_SUCCESS, payload: actionPayload });
    history.push('/dashboard');
  } catch (error) {
    dispatch({ type: USER_REGISTER_FAIL, payload: error.message });
  }
};

const logout = (history) => (dispatch) => {
  debugger
  console.log('in logout');
  localStorage.removeItem('authToken');
  console.log(localStorage);
  dispatch({ type: USER_LOGOUT });
  console.log(history);
  history.push('/');
};

export { signin, register, logout };
