import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredientsReducer';
import { orderReducer } from './orderReducer';
import { modalReducer } from './modalReducer';
import { forgotReducer } from './forgotReducer';
import { resetReducer } from './resetReducer';
// import { registerReducer } from './registerReducer';

export const rootReducer = combineReducers({
 ingredients: ingredientsReducer,
 orderData: orderReducer,
 modalState: modalReducer,
 forgotPassword: forgotReducer,
 resetPassword: resetReducer,
//  user: registerReducer
});


