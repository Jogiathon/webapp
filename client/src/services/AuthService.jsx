import jwtDecode from 'jwt-decode';
import axios from 'axios';

const tokenKey = "token";

export function loginWithJwt (jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem('token');
    if (jwt != null) {
        return jwtDecode(jwt);
    }
  } catch (ex) {
    return null;
  }
}

export default { 
  loginWithJwt,
  logout,
  getCurrentUser
};