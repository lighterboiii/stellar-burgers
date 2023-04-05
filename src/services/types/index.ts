import { store } from '../store'
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { Action, ActionCreator, AnyAction } from 'redux';
import { TIngredientsActions } from '../actions/ingredientsActions';
import { TModalActions } from '../actions/modalActions';
import { TOrderActions } from '../actions/orderActions';
import { TUserActions } from '../actions/userActions';
import { TWSActions } from '../actions/wsActions';
import { TIngredientsState } from '../reducers/ingredientsReducer';
import { TUserState } from '../reducers/userReducer';
import { TOrderState } from '../reducers/orderReducer';
import { TSocketState } from '../reducers/wsReducer';
import { TModalState } from '../reducers/modalReducer';
import { rootReducer } from '../reducers/rootReducer';

export type RootState = ReturnType<typeof rootReducer>;

type TApplicationActions =
  | TIngredientsActions
  | TModalActions
  | TOrderActions
  | TUserActions
  | TWSActions;

export type AppThunk<ReturnType = void> = ActionCreator<ThunkAction<ReturnType, RootState, unknown, TApplicationActions>>;

export type AppDispatch = ThunkDispatch<RootState, never, TApplicationActions>;