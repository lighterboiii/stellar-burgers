import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredientsReducer';
import { orderReducer } from './orderReducer';
import { modalReducer } from './modalReducer';

export const rootReducer = combineReducers({
 ingredients: ingredientsReducer,
 orderData: orderReducer,
 modalState: modalReducer
});


