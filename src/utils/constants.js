import PropTypes from 'prop-types';

export const BURGER_API_URL = 'https://norma.nomoreparties.space/api';

export const ORDERS_KEY = '/orders';
export const INGREDIENTS_KEY = '/ingredients';
export const FORGOT_PASS_KEY = '/password-reset';
export const RESET_PASS_KEY = '/password-reset/reset';
export const REGISTER_USER_KEY = '/auth/register';
export const LOGIN_KEY = '/auth/login';
export const USER_KEY = '/auth/user';
export const TOKEN_KEY = '/auth/token';
export const LOGOUT_KEY = '/auth/logout';

export const ORDERS_WS_URL = 'wss://norma.nomoreparties.space/orders/all';
export const USER_ORDERS_WS_URL = 'wss://norma.nomoreparties.space/orders';

export const IngredientPropTypes = PropTypes.shape({
  calories: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  image_large: PropTypes.string.isRequired,
  image_mobile: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  proteins: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired,
}).isRequired


