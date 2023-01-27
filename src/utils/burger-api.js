import {
  BURGER_API_URL, FORGOT_PASS_URL
} from "../constants/constants";

const checkRes = (res) => {
  return res.ok ? res.json() : res.json().then(err => Promise.reject(`Ошибка загрузки данных с сервера: ${res.status}`))
}

function request(url, options) {
  return fetch(url, options).then(checkRes)
}

function getIngredients() {
  return request(`${BURGER_API_URL}/ingredients`)
}

function sendOrder(data) {
  return request(`${BURGER_API_URL}/orders`, {
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

export { getIngredients, sendOrder, forgotPasswordRequest }