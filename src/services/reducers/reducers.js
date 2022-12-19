import { combineReducers } from 'redux';
import {
  GET_INGREDIENTS
} from '../actions/actions';

const initialState = {
  ingredients: [],
  currentConstructor: [],
  currentIngredient: null,
  order: null
}

export const ingredientsReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_INGREDIENTS: {
      return {
        ...state,
        ingredients: action.payload,
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


