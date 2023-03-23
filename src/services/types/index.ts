import { store } from '../store';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { Action, ActionCreator, AnyAction } from 'redux';
import { TIngredientsActions } from '../actions/ingredientsActions';
import { TModalActions } from '../actions/modalActions';
import { TOrderActions } from '../actions/orderActions';
import { TUserActions } from '../actions/userActions';
import { TWSActions } from '../actions/wsActions';

export type RootState = ReturnType<typeof store.getState>;

type TApplicationActions =
  | TIngredientsActions
  | TModalActions
  | TOrderActions
  | TUserActions
  | TWSActions;

export type AppThunk<TReturn = void> = ActionCreator<ThunkAction<TReturn, Action, RootState, TApplicationActions>>;

export type AppDispatch = ThunkDispatch<RootState, AnyAction, TApplicationActions>;