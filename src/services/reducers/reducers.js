import { combineReducers } from 'redux';
import {
  GET_INGREDIENTS,
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_SUCCESS, 
  OPEN_INGREDIENT_INFO,
  SELECT_INGREDIENT,
  SET_ORDER_DETAILS,
  DELETE_INGREDIENT
} from '../actions/actions';

const initialState = {
  ingredients: [],
  selectedIngredients: [],
  currentIngredient: null,
  orderDetails: null,
  ingredientsRequest: false,
  ingredientsFailed: false,
  isElementDrag: false
}


export const ingredientsReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_INGREDIENTS: {
      return {
        ...state,
        ingredientsRequest: true,
        ingredientsFailed: false
      }
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        ingredientsRequest: false,
        ingredientsFailed: true,
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredientsRequest: false,
        ingredients: action.payload,
      };
    }
    case OPEN_INGREDIENT_INFO: {
      return {
        ...state,
        currentIngredient: action.payload
      }
    }
    case SET_ORDER_DETAILS: {
      return {
        ...state,
        orderDetails: action.payload
      }
    }
    case SELECT_INGREDIENT: {
      return {
        ...state,
        selectedIngredients: action.payload
      }
    }
    case DELETE_INGREDIENT: {
      return {
        ...state,
        selectedIngredients: action.payload
      }
    }
    default: {
      return state;
    }
  }
};

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer
})


