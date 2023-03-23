import {
  OPEN_BURGER_DETAILS_MODAL,
  OPEN_INGREDIENTS_MODAL,
  OPEN_ORDER_DETAILS_MODAL
} from '../constants/index';

export interface IOpenIngredientsModal {
  readonly type: typeof OPEN_INGREDIENTS_MODAL;
  readonly payload: boolean;
}

export interface IOpenBurgerDetailsModal {
  readonly type: typeof OPEN_BURGER_DETAILS_MODAL;
  readonly payload: boolean;
}

export interface IOpenOrderDetailsModal {
  readonly type: typeof OPEN_ORDER_DETAILS_MODAL;
  readonly payload: boolean
}

export type TModalActions = 
  | IOpenBurgerDetailsModal
  | IOpenIngredientsModal
  | IOpenOrderDetailsModal;

export const changeOrderModalStatus = (status: boolean): IOpenOrderDetailsModal => ({
  type:  OPEN_ORDER_DETAILS_MODAL,
  payload: status
});

export const changeIngredientModalStatus = (status: boolean): IOpenIngredientsModal => ({
  type:  OPEN_INGREDIENTS_MODAL,
  payload: status
});

export const changeBurgerDetailsModalStatus = (status: boolean): IOpenBurgerDetailsModal => ({
  type:  OPEN_BURGER_DETAILS_MODAL,
  payload: status
});