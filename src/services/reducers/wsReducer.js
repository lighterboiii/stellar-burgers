import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE
} from '../actions/wsActions';

const initialState = {
  wsConnecting: false,
  wsOpened: false,
  orders: [],
  error: undefined
};

export const wsReducer = (state = initialState, action) => {
  switch (action.type) {
    case WS_CONNECTION_START: 
      return {
        ...state,
        wsConnecting: true
      }
    case WS_CONNECTION_SUCCESS: 
      return {
        ...state,
        error: undefined,
        wsConnecting: false,
        wsStart: true
      };
    case WS_CONNECTION_ERROR:
      return {
        ...state,
        error: action.payload,
        wsConnecting: false,
        wsOpened: false
      };
    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        error: undefined,
        wsConnected: false,
        wsOpened: false
      };
    case WS_GET_MESSAGE:
      return {
        ...state,
        error: undefined,
        orders: [...state.orders, action.payload]
      };
    default:
      return state;
  }
};