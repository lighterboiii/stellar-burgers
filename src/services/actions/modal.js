export const OPEN_ORDER_DETAILS_MODAL = 'OPEN_ORDER_DETAILS_MODAL';
export const OPEN_INGREDIENTS_MODAL = 'OPEN_INGREDIENTS_MODAL';
export const OPEN_BURGER_DETAILS_MODAL = 'OPEN_BURGER_DETAILS_MODAL';

export const changeOrderModalStatus = (status) => ({
  type:  OPEN_ORDER_DETAILS_MODAL,
  payload: status
});

export const changeIngredientModalStatus = (status) => ({
  type:  OPEN_INGREDIENTS_MODAL,
  payload: status
});

export const changeBurgerDetailsModalStatus = (status) => ({
  type:  OPEN_BURGER_DETAILS_MODAL,
  payload: status
});