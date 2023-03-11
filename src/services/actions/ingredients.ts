import { getIngredients } from '../../utils/api.js';
import {
  GET_INGREDIENTS_SUCCESS,
  OPEN_INGREDIENT_INFO,
  DELETE_ALL_INGREDIENTS,
  SORT_INGREDIENTS
} from '../constants/index.js';

export const deleteAllIngredients = () => {
  return function (dispatch) {
    dispatch({
      type: DELETE_ALL_INGREDIENTS,
      payload: []
    })
  }
}

export const sortIngredients = (dragIndex, hoverIndex, selectedIngredients) => {
  return function (dispatch) {
    const dragItem = selectedIngredients[dragIndex];
    const sortedIngredients = [...selectedIngredients];
    const hoverItem = sortedIngredients.splice(hoverIndex, 1, dragItem);
    sortedIngredients.splice(dragIndex, 1, hoverItem[0]);
    dispatch({
      type: SORT_INGREDIENTS,
      payload: sortedIngredients
    })
  }
};

export const getIngredientsData = () => {
  return function (dispatch) {
    getIngredients()
      .then((res) => {
        if (res) {
          dispatch({
            type: GET_INGREDIENTS_SUCCESS,
            payload: res.data
          })
        }
      })
      .catch(e => {
        console.log(`Ошибка ${e.message}`)
      })
  }
}

export const currentIngredient = (ingredient) => ({ type: OPEN_INGREDIENT_INFO, payload: ingredient });