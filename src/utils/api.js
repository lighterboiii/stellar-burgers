import {
  BURGER_API_URL, FORGOT_PASS_KEY, RESET_PASS_KEY, INGREDIENTS_KEY, ORDERS_KEY, REGISTER_USER_KEY, LOGIN_KEY, USER_KEY, TOKEN_KEY, LOGOUT_KEY
} from "./constants";
import { setCookie } from "./cookie";

const checkRes = (res) => {
  return res.ok ? res.json() : res.json().then(err => Promise.reject(`Ошибка загрузки данных с сервера: ${err.status}`))
}

export async function request(url, options) {
  const res = await fetch(url, options);
  return checkRes(res);
}

export const requestWithRefresh = async (url, options) => {
  try {
    const res = await fetch(url, options);
    return await checkRes(res);
  } catch (err) {
    if (err.message === 'jwt expired') {
      const refreshData = await refreshTokenRequest();
      if (!refreshData.success) {
        Promise.reject(refreshData);
      }
      localStorage.setItem('refreshToken', refreshData.refreshToken);
      setCookie('accessToken', refreshData.accessToken);
      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(url, options);
      return await checkRes(res);
    }
  }
};

export function getIngredients() {
  return request(`${BURGER_API_URL}${INGREDIENTS_KEY}`)
}

export function sendOrderRequest(data, accessToken) {
  return requestWithRefresh(`${BURGER_API_URL}${ORDERS_KEY}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'authorization': accessToken
    },
    body: JSON.stringify({
      "ingredients": data
    })
  })
}

export function forgotPasswordRequest(email) {
  return request(`${BURGER_API_URL}${FORGOT_PASS_KEY}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'email': email
    })
  })
}

export function resetPasswordRequest(password, token) {
  return request(`${BURGER_API_URL}${RESET_PASS_KEY}`, {
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

export function registerUserRequest(email, password, name) {
  return request(`${BURGER_API_URL}${REGISTER_USER_KEY}`, {
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

export function loginRequest(email, password) {
  return request(`${BURGER_API_URL}${LOGIN_KEY}`, {
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
// запрос данных пользователя
export function checkUserDataRequest(accessToken) {
  return requestWithRefresh(`${BURGER_API_URL}${USER_KEY}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'authorization': accessToken
    }
  })
}
// обновление данных пользователя
export function changeUserDataRequest(name, email, password, accessToken) {
  return requestWithRefresh(`${BURGER_API_URL}${USER_KEY}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'authorization': accessToken
    },
    body: JSON.stringify({
      name,
      email,
      password
    })
  })
}
// запрос рефреша
export function refreshTokenRequest(refreshToken) {
  return request(`${BURGER_API_URL}${TOKEN_KEY}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      token: refreshToken
    })
  }
  )
}
// запрос логаута
export function signOutRequest(refreshToken) {
  return request(`${BURGER_API_URL}${LOGOUT_KEY}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      token: refreshToken
    })
  })
}
