export const WS_CONNECTION_START_USER = 'WS_CONNECTION_START_USER';
export const WS_CONNECTION_START_ALL = 'WS_CONNECTION_START_ALL';
export const WS_CONNECTION_SUCCESS = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED = 'WS_CONNECTION_CLOSED';
export const WS_GET_MESSAGE = 'WS_GET_MESSAGE';
export const WS_SEND_MESSAGE = 'WS_SEND_MESSAGE';


export const wsConnectionStart = (url) => ({ type: WS_CONNECTION_START_ALL, payload: url });

export const wsConnectionSuccess = () => ({ type: WS_CONNECTION_SUCCESS });

export const wsConnectionError = () => ({ type: WS_CONNECTION_ERROR });

export const wsConnectionClosed = () => ({ type: WS_CONNECTION_CLOSED });

export const wsGetMessage = (message) => ({ type: WS_GET_MESSAGE, payload: message });