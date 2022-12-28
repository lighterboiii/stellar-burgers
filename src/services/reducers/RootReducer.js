import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredientsReducer';
import { orderReducer } from './orderReducer';
import { modalReducer } from './modalReducer';

// const initialState = {
//   ingredients: [],
//   selectedIngredients: [],
//   currentIngredient: null,
//   orderDetails: null,
//   ingredientsRequest: false,
//   ingredientsFailed: false,
//   isElementDrag: false
// };

// export const orderReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case OPEN_INGREDIENT_INFO: {
//       return {
//         ...state,
//         currentIngredient: action.payload
//       }
//     }
//     case SET_ORDER_DETAILS: {
//       return {
//         ...state,
//         selectedIngredients: [],
//         orderDetails: action.payload
//       }
//     }
//     default: {
//       return state;
//     }
//   }
// };

export const rootReducer = combineReducers({
 ingredients: ingredientsReducer,
 orderData: orderReducer,
 modalState: modalReducer
});


