// ingredients action types
export const GET_INGREDIENTS_REQUEST: 'GET_INGREDIENTS_REQUEST' = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_FAILED: 'GET_INGREDIENTS_FAILED' = 'GET_INGREDIENTS_FAILED';
export const GET_INGREDIENTS_SUCCESS: 'GET_INGREDIENTS_SUCCESS' = 'GET_INGREDIENTS_SUCCESS';
export const OPEN_INGREDIENT_INFO: 'OPEN_INGREDIENT_INFO' = 'OPEN_INGREDIENT_INFO';
export const SELECT_INGREDIENT: 'SELECT_INGREDIENT' = 'SELECT_INGREDIENT';
export const SELECT_BUN_INGREDIENT: 'SELECT_BUN_INGREDIENT' = 'SELECT_BUN_INGREDIENT';
export const DELETE_INGREDIENT: 'DELETE_INGREDIENT' = 'DELETE_INGREDIENT';
export const SORT_INGREDIENTS: 'SET_INGREDIENTS' = 'SET_INGREDIENTS';
export const DELETE_ALL_INGREDIENTS: 'DELETE_ALL_INGREDIENTS' = 'DELETE_ALL_INGREDIENTS';
// modal action types 
export const OPEN_ORDER_DETAILS_MODAL: 'OPEN_ORDER_DETAILS_MODAL' = 'OPEN_ORDER_DETAILS_MODAL';
export const OPEN_INGREDIENTS_MODAL:'OPEN_INGREDIENTS_MODAL' = 'OPEN_INGREDIENTS_MODAL';
export const OPEN_BURGER_DETAILS_MODAL: 'OPEN_BURGER_DETAILS_MODAL' = 'OPEN_BURGER_DETAILS_MODAL';
// order action types 
export const SET_ORDER_DETAILS: 'SET_ORDER_DETAILS' = 'SET_ORDER_DETAILS';
export const SET_ORDER_DETAILS_FAILED: 'SET_ORDER_DETAILS_FAILED' = 'SET_ORDER_DETAILS_FAILED';
export const SET_ORDER_DETAILS_SUCCESS: 'SET_ORDER_DETAILS_SUCCESS' = 'SET_ORDER_DETAILS_SUCCESS';
export const CLEAR_ORDER_DETAILS: 'CLEAR_ORDER_DETAILS' = 'CLEAR_ORDER_DETAILS';
// login
export const LOGIN: 'LOGIN' = 'LOGIN';
export const LOGIN_SUCCESS: 'LOGIN_SUCCESS' = 'LOGIN_SUCCESS';
export const LOGIN_FAILED: 'LOGIN_FAILED' = 'LOGIN_FAILED';
// registration
export const REGISTER: 'REGISTER' = 'REGISTER';
export const REGISTER_SUCCESS: 'REGISTER_SUCCESS' = 'REGISTER_SUCCESS';
export const REGISTER_FAILED: 'REGISTER_FAILED' = 'REGISTER_FAILED';
// sing out
export const LOGOUT: 'LOGOUT' = 'LOGOUT';
export const LOGOUT_SUCCESS: 'LOGOUT_SUCCESS' = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED: 'LOGOUT_FAILED' = 'LOGOUT_FAILED';
// set user data 
export const SET_USER_DATA: 'SET_USER_DATA' = 'SET_USER_DATA';
export const SET_USER_DATA_SUCCESS: 'SET_USER_DATA_SUCCESS' = 'SET_USER_DATA_SUCCESS';
export const SET_USER_DATA_FAILED: 'SET_USER_DATA_FAILED' = 'SET_USER_DATA_FAILED';
// get user data
export const GET_USER_DATA: 'GET_USER_DATA' = 'GET_USER_DATA';
export const GET_USER_DATA_SUCCESS: 'GET_USER_DATA_SUCCESS' = 'GET_USER_DATA_SUCCESS';
export const GET_USER_DATA_FAILED: 'GET_USER_DATA_FAILED' = 'GET_USER_DATA_FAILED';
// password forgot check
export const SET_FORGOT_PASSWORD: 'SET_FORGOT_PASSWORD' = 'SET_FORGOT_PASSWORD';
// JWT actions 
export const WS_CONNECTION_START = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED = 'WS_CONNECTION_CLOSED';
export const WS_GET_MESSAGE = 'WS_GET_MESSAGE';
export const WS_SEND_MESSAGE = 'WS_SEND_MESSAGE';