import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_SUCCESS,
  SELECT_INGREDIENT,
  SELECT_BUN_INGREDIENT,
  DELETE_INGREDIENT,
  SORT_INGREDIENTS,
  OPEN_INGREDIENT_INFO,
  DELETE_ALL_INGREDIENTS
} from '../constants/index';
import { IIngredient } from '../actions/ingredientsActions';
import { TIngredientsActions } from '../actions/ingredientsActions';

export type TIngredientsState = {
  ingredients: Array<IIngredient>;
  selectedIngredients: Array<IIngredient>;
  bunElement?: IIngredient | undefined;
  currentIngredient: IIngredient | null;
  ingredientsRequest: boolean;
  ingredientsFailed: boolean;
  isElementDrag: boolean;
};

const initialState: TIngredientsState = {
  ingredients: [],
  selectedIngredients: [],
  bunElement: undefined,
  currentIngredient: null,
  ingredientsRequest: false,
  ingredientsFailed: false,
  isElementDrag: false
};

export const ingredientsReducer = (state = initialState, action: TIngredientsActions) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
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
    case SELECT_INGREDIENT: {
      return {
        ...state,
        selectedIngredients: action.payload
      }
    }
    case SELECT_BUN_INGREDIENT: {
      return {
        ...state,
        bunElement: action.payload,
      }
    }
    case DELETE_INGREDIENT: {
      return {
        ...state,
        selectedIngredients: action.payload
      }
    }
    case SORT_INGREDIENTS: {
      return {
        ...state,
        selectedIngredients: action.payload
      }
    }
    case DELETE_ALL_INGREDIENTS: {
      return {
        ...state,
        bunElement : undefined,
        selectedIngredients: action.payload
      }
    }
    default: {
      return state;
    }
  }
};