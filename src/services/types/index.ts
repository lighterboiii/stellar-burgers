import { store } from '../store';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { Action, ActionCreator, AnyAction } from 'redux';
import { TIngredientsActions } from '../actions/ingredients';
import { TModalActions } from '../actions/modal';
import { TOrderActions } from '../actions/order';
import { TUserActions } from '../actions/user';
import { TWSActions } from '../actions/wsActions';

export type RootState = ReturnType<typeof store.getState>;

type TApplicationActions =
  | TIngredientsActions
  | TModalActions
  | TOrderActions
  | TUserActions
  | TWSActions;

export type AppThunk<TReturn = void> = ActionCreator<ThunkAction<TReturn, Action, RootState, TApplicationActions>>;

// export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, Action, RootState, TApplicationActions>;

export type AppDispatch = ThunkDispatch<RootState, AnyAction, TApplicationActions>;