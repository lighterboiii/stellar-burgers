import {
  OPEN_BURGER_DETAILS_MODAL,
  OPEN_INGREDIENTS_MODAL,
  OPEN_ORDER_DETAILS_MODAL
} from '../constants/index.js';

export const changeOrderModalStatus = (status: boolean) => ({
  type:  OPEN_ORDER_DETAILS_MODAL,
  payload: status
});

export const changeIngredientModalStatus = (status: boolean) => ({
  type:  OPEN_INGREDIENTS_MODAL,
  payload: status
});

export const changeBurgerDetailsModalStatus = (status: boolean) => ({
  type:  OPEN_BURGER_DETAILS_MODAL,
  payload: status
});