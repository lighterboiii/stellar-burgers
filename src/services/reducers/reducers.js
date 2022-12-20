import { combineReducers } from 'redux';
import {
  GET_INGREDIENTS, 
  SELECT_INGREDIENT,
  SET_ORDER_DETAILS
} from '../actions/actions';

const initialState = {
  ingredients: [],
  currentConstructor: [],
  currentIngredient: null,
  orderDetails: null
}

export const ingredientsReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_INGREDIENTS: {
      return {
        ...state,
        ingredients: action.payload,
      }
    }
    case SELECT_INGREDIENT: {
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
    default: {
      return state;
    }
  }
}

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer
})


