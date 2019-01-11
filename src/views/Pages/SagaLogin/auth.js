//import request from './fakeRequest'
import request from './realRequest'

/*
let localStorage

// If we're testing, use a local storage polyfill
if (global.process && process.env.NODE_ENV === 'test') {
  localStorage = require('localStorage')
} else {
  // If not, use the browser one
  localStorage = global.window.localStorage
}
*/
const auth = {
  /**
  * Logs a user in, returning a promise with `true` when done
  * @param  {string} username The username of the user
  * @param  {string} password The password of the user
  */
  simlogin(userid, role) {
    try {
      return Promise.resolve(true)

    } catch (error) {
      console.log('Auth Error: ', error)
      return Promise.reject('Cannot login')
    }
    // Post a fake request
  },
  login(username, password) {
    try {
      if (auth.loggedIn()) return Promise.resolve(true)

      return request.post('/login', { username, password })
        .then(response => {
          // Save token to local storage
          console.log('response from AUTH: ', response)
          //var user = localStorage.getItem('user');
          //console.log('is Error?: ', response.message)
          if (!response.message) {
            return Promise.resolve(true)
          } else {
            return Promise.reject(response)
          }
          //localStorage.token = response.token

        })

    } catch (error) {
      console.log('Auth Error: ', error)
      return Promise.reject('Cannot login')
    }
    // Post a fake request
  },
  /**
  * Logs the current user out
  */
  logout() {
    return request.post('/logout')
  },
  /**
  * Checks if a user is logged in
  */
  loggedIn() {
    var user = localStorage.getItem('user');
    var isLogged = false;
    /*
    if (user) {
      user = JSON.parse(user);
      if (user.token !== '') {
        isLogged = true;
      }
    }*/
    if (user) {
      isLogged = true;
    }
    return isLogged;
  },
  /**
  * Registers a user and then logs them in
  * @param  {string} username The username of the user
  * @param  {string} password The password of the user
  */
  register(username, password) {
    // Post a fake request
    return request.post('/register', { username, password })
      // Log user in after registering
      .then(() => auth.login(username, password))
  },
  onChange() { }
}

export default auth