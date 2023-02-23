import { getCookie } from "../../utils/cookie";

export const socketMiddleware = (wsUrl, wsActions) => {
  return store => {
    let socket = null;
    let url = undefined;

    return next => action => {
      const { dispatch } = store;
      const { type, payload } = action;
      const { wsStart, onOpen, onError, onClose } = wsActions;

      if (type === wsStart) {
        url = payload;
        socket = new WebSocket(url);
      } else if (type === onClose) {
        socket.close(1000, 'CLOSE_NORMAL')
      }
      if (socket) {
        socket.onopen = event => {
          dispatch({ type: 'WS_CONNECTION_SUCCESS', payload: event });
        };
        socket.onerror = event => {
          dispatch({ type: 'WS_CONNECTION_ERROR', payload: event });
        };
        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          dispatch({ type: 'WS_GET_MESSAGE', payload: parsedData });
        };
        socket.onClose = event => {
          dispatch({ type: 'WS_CONNECTION_CLOSED', payload: event });
        };

        if (type === 'WS_SEND_MESSAGE') {
          const message = payload;
          socket.send(JSON.stringify(message));
        }
      }

      next(action);
    };
  };
};