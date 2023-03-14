import { IIngredient } from "../services/actions/ingredients";
import {
  BURGER_API_URL, FORGOT_PASS_KEY, RESET_PASS_KEY, INGREDIENTS_KEY, ORDERS_KEY, REGISTER_USER_KEY, LOGIN_KEY, USER_KEY, TOKEN_KEY, LOGOUT_KEY
} from "./constants";
import { getCookie, setCookie } from "./cookie";

const checkRes = (res: Response) => {
  return res.ok ? res.json() : res.json().then(err => Promise.reject(`Ошибка загрузки данных с сервера: ${err.status}`))
}

export async function request(url: string, options?: any) {
  const res = await fetch(url, options);
  return checkRes(res);
}
//TODO: избавиться от any?
export const requestWithRefresh = async (url: string, options: any) => {
  try {
    const res = await fetch(url, options);
    return await checkRes(res);
  } catch (err: any) {
    if (err.message === 'jwt expired') {
      const refreshData = await refreshTokenRequest(getCookie("refreshToken"));
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

export function sendOrderRequest(data: Array<IIngredient>, accessToken: string | undefined) {
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

export function forgotPasswordRequest(email: string) {
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

export function resetPasswordRequest(password: string, token: string | undefined) {
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

export function registerUserRequest(email: string, password: string, name: string) {
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

export function loginRequest(email: string, password: string) {
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
export function checkUserDataRequest(accessToken: string | undefined) {
  return requestWithRefresh(`${BURGER_API_URL}${USER_KEY}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'authorization': accessToken
    }
  })
}
// обновление данных пользователя
export function changeUserDataRequest(name: string, email: string, password: string, accessToken: string | undefined) {
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
export function refreshTokenRequest(refreshToken: string | undefined) {
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
export function signOutRequest(refreshToken: string | undefined) {
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
