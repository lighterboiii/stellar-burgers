import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredientsReducer';
import { orderReducer } from './orderReducer';
import { modalReducer } from './modalReducer';
import { userReducer } from './userReducer';
import { wsReducer } from './wsReducer'

export const rootReducer = combineReducers({
 ingredients: ingredientsReducer,
 orderData: orderReducer,
 modalState: modalReducer,
 userInfo: userReducer,
 socketReducer: wsReducer
});