import { rootReducer } from './reducers/rootReducer';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { socketMiddleware } from '../services/middleware/socketMiddleware';
import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_SEND_MESSAGE
} from './constants/index';

const wsActions = {
  wsStart: WS_CONNECTION_START,
  onOpen: WS_CONNECTION_SUCCESS,
  onError: WS_CONNECTION_ERROR,
  onClose: WS_CONNECTION_CLOSED,
  onMessage: WS_GET_MESSAGE,
  wsSend: WS_SEND_MESSAGE
}

const enhancer = composeWithDevTools(
  applyMiddleware(thunk, socketMiddleware(wsActions))
);

export const store = createStore(rootReducer, enhancer);