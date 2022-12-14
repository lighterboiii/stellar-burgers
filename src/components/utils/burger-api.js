import { BURGER_API_URL } from "../constants/constants";

const checkRes = (res) => {
  return res.ok ? res.json() : res.json().then(err => Promise.reject(`Ошибка загрузки данных с сервера: ${res.status}`))
}

function getIngredients() {
  return fetch(`${BURGER_API_URL}/ingredients`)
    .then(checkRes)
}

function sendOrder(data) {
  return fetch(`${BURGER_API_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "ingredients": data
    })
  })
  .then(checkRes)
}

export { getIngredients, sendOrder }