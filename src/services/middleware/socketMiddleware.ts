
import { getCookie } from '../../utils/cookies';
import { Action, AnyAction, Middleware } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { updateFeedAction } from '../feed';
import {
  WS_CONNECTION_START,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_SUCCESS,
  WS_SEND_MESSAGE,
  WS_GET_MESSAGE,
  WS_CONNECTION_CLOSE
} from '../action-types'
import { updateOrdersAction } from '../orders';

type SocketMiddleware<S = {}, A extends Action = AnyAction, E = undefined> =
  Middleware<ThunkDispatch<S, E, A>, S, ThunkDispatch<S, E, A>>;

function socketMiddleware(): SocketMiddleware {
  return store => {
    let socket: WebSocket | null = null;

    return next => action => {
      const { dispatch } = store;
      const { type, payload } = action;
      if (type === WS_CONNECTION_START) {
        const { wsUrl, wsType } = payload;
        socket = new WebSocket(wsUrl);
        socket.onopen = () => {
          dispatch({ type: WS_CONNECTION_SUCCESS });
        };

        socket.onerror = () => {
          dispatch({
            type: WS_CONNECTION_ERROR,
            payload: { code: -1, reason: 'Unexpected Error' }
          });
        };

        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;
          if (wsType === 'orders') {
            dispatch(updateOrdersAction(restParsedData));
          } else if (wsType === 'feed') {
            dispatch(updateFeedAction(restParsedData));
          }

          dispatch({ type: WS_GET_MESSAGE, payload: restParsedData });
        };

        socket.onclose = ({code, reason }) => {
          dispatch({ type: WS_CONNECTION_CLOSED, payload: { code, reason } });
        };
      }
      if (socket) {
        if (type === WS_SEND_MESSAGE) {
          const token = getCookie('token')
          const message = { ...payload, token };
          socket.send(JSON.stringify(message));
        } else if (type === WS_CONNECTION_CLOSE) {
          socket.close(1000, 'Closed by peer');
          socket = null;
        }
      }

      next(action);
    };
  };
}

export {
  socketMiddleware
}
