import { BURGER_API_URL } from "../constants/constants";

const checkRes = (res) => {
  return res.ok ? res.json() : res.json().then(err => Promise.reject(err))
}

function getIngredients() {
  return fetch(`${BURGER_API_URL}/ingredients`)
   .then(checkRes)
}


export { getIngredients }