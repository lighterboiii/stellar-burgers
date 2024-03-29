import { getIngredients } from '../../utils/api';
import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_SUCCESS,
  OPEN_INGREDIENT_INFO,
  DELETE_ALL_INGREDIENTS,
  SORT_INGREDIENTS,
  SELECT_INGREDIENT,
  SELECT_BUN_INGREDIENT,
  DELETE_INGREDIENT
} from '../constants/index';
import { AppDispatch } from '../types/index.js';

export interface IIngredient {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
  uniqueId?: string;
}

export interface IGetIngredientsRequest {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
}

export interface IGetIngredientsFailed {
  readonly type: typeof GET_INGREDIENTS_FAILED;
}

export interface IGetIngredientsSuccess {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly payload: Array<IIngredient>;
}

export interface IOpenIngredientInfo {
  readonly type: typeof OPEN_INGREDIENT_INFO;
  readonly payload: IIngredient | undefined;
}

export interface ISortIngredients {
  readonly type: typeof SORT_INGREDIENTS;
  readonly payload: Array<IIngredient>;
}

export interface ISelectIngredient {
  readonly type: typeof SELECT_INGREDIENT;
  readonly uniqueId: string;
  readonly payload: IIngredient | undefined;
}

export interface ISelectBunIngredient {
  readonly type: typeof SELECT_BUN_INGREDIENT;
  readonly payload: IIngredient | undefined;
}

export interface IDeleteAllIngredients {
  readonly type: typeof DELETE_ALL_INGREDIENTS;
  readonly payload: never[];
}

export interface IDeleteIngredient {
  readonly type: typeof DELETE_INGREDIENT;
  readonly payload: Array<IIngredient>;
}

export type TIngredientsActions =
  | IGetIngredientsRequest
  | IGetIngredientsFailed
  | IGetIngredientsSuccess
  | IOpenIngredientInfo
  | ISortIngredients
  | ISelectIngredient
  | ISelectBunIngredient
  | IDeleteAllIngredients
  | IDeleteIngredient;

export const setDeleteAllIngredients = (): IDeleteAllIngredients => ({ type: DELETE_ALL_INGREDIENTS, payload: [] });
export const setSortIngredients = (ingredients: Array<IIngredient>): ISortIngredients => ({ type: SORT_INGREDIENTS, payload: ingredients });

export const getIngredientsRequest = (): IGetIngredientsRequest => ({ type: GET_INGREDIENTS_REQUEST });
export const getIngredientsFailed = (): IGetIngredientsFailed => ({ type: GET_INGREDIENTS_FAILED });
export const getIngredientsSuccess = (res: Array<IIngredient>): IGetIngredientsSuccess => ({ type: GET_INGREDIENTS_SUCCESS, payload: res });

export const currentIngredient = (ingredient: IIngredient | undefined): IOpenIngredientInfo => ({ type: OPEN_INGREDIENT_INFO, payload: ingredient });

export const selectIngredient = (id: string, selectedIngredient: IIngredient | undefined)
  : ISelectIngredient =>
({
  type: SELECT_INGREDIENT,
  uniqueId: id,
  payload: selectedIngredient
});

export const selectBunIngredient = (selectedIngredient: IIngredient | undefined): ISelectBunIngredient =>
({
  type: SELECT_BUN_INGREDIENT,
  payload: selectedIngredient
});

export const deleteIngredient = (array: Array<IIngredient>): IDeleteIngredient => ({ type: DELETE_INGREDIENT, payload: array });

export const deleteAllIngredients = () => {
  return function (dispatch: AppDispatch) {
    dispatch(setDeleteAllIngredients());
  }
};

export const getIngredientsData = () => {
  return function (dispatch: AppDispatch) {
    getIngredients()
      .then((res) => {
        if (res) {
          dispatch(getIngredientsSuccess(res.data))
        }
      })
      .catch(e => {
        console.log(`Ошибка ${e.message}`)
      })
  }
};