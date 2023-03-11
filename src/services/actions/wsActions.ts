import {
  WS_CONNECTION_START, WS_CONNECTION_SUCCESS, WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR, WS_GET_MESSAGE
} from '../constants/index.js';

export const wsConnectionStart = (url: string) => ({ type: WS_CONNECTION_START, payload: url });

export const wsConnectionSuccess = () => ({ type: WS_CONNECTION_SUCCESS });

export const wsConnectionError = () => ({ type: WS_CONNECTION_ERROR });

export const wsConnectionClosed = () => ({ type: WS_CONNECTION_CLOSED });

export const wsGetMessage = (message) => ({ type: WS_GET_MESSAGE, payload: message });