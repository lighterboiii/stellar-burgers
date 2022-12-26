export const GET_INGREDIENTS = 'GET_INGREDIENTS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const OPEN_INGREDIENT_INFO = 'OPEN_INGREDIENT_INFO';
export const SELECT_INGREDIENT = 'SELECT_INGREDIENT';
export const SET_ORDER_DETAILS = 'SET_ORDER_DETAILS';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const SORT_INGREDIENTS = 'SET_INGREDIENTS';

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