import {
  BURGER_API_URL, FORGOT_PASS_URL, RESET_PASS_URL, INGREDIENTS_URL, ORDER_URL, REGISTER_USER_URL, LOGIN_URL, USER_URL, TOKEN_URL, LOGOUT_URL
} from "../constants/constants";

const checkRes = (res) => {
  return res.ok ? res.json() : res.json().then(err => Promise.reject(`Ошибка загрузки данных с сервера: ${err.status}`))
}

function request(url, options) {
  return fetch(url, options).then(checkRes)
}

function getIngredients() {
  return request(`${BURGER_API_URL}${INGREDIENTS_URL}`)
}

function sendOrder(data) {
  return request(`${BURGER_API_URL}${ORDER_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "ingredients": data
    })
  })
}

function forgotPasswordRequest(email) {
  return request(`${BURGER_API_URL}${FORGOT_PASS_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'email': email
    })
  })
}

function resetPasswordRequest(password, token) {
  return request(`${BURGER_API_URL}${RESET_PASS_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'password': password,
      'token': token
    })
  })
}

function registerUser(email, password, name) {
  return request(`${BURGER_API_URL}${REGISTER_USER_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password,
      name
    })
  })
}

function login(email, password) {
  return request(`${BURGER_API_URL}${LOGIN_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  })
}

function getUserData(token) {
  return request(`${BURGER_API_URL}${USER_URL}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'authorization': token
    }
  })
}

function patchUserData(token, name, email, password) {
  return request(`${BURGER_API_URL}${USER_URL}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'authorization': token
    },
    body: JSON.stringify({
      name,
      email,
      password
    })
  })
}

function refreshToken(token) {
  return request(`${BURGER_API_URL}${TOKEN_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      token
    })
  }
  )
}

function signOut(token) {
  return request(`${BURGER_API_URL}${LOGOUT_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      token
    })
  })
}

export { getIngredients, sendOrder, forgotPasswordRequest, resetPasswordRequest, registerUser, login, getUserData, refreshToken, signOut, patchUserData }