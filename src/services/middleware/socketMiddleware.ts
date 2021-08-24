
import { getCookie } from '../../utils/cookies';
import { Action, AnyAction, Middleware } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { updateFeedAction } from '../feed';

type WebSocketAction = Record<string, string>
type SocketMiddleware<S = {}, A extends Action = AnyAction, E = undefined> =
  Middleware<ThunkDispatch<S, E, A>, S, ThunkDispatch<S, E, A>>;

function socketMiddleware(wsUrl: string, wsActions: WebSocketAction): SocketMiddleware {
  return store => {
    let socket: WebSocket | null = null;

    return next => action => {
      const { dispatch } = store;
      const { type, payload } = action;
      const { wsInit, wsSendMessage, onOpen, onClose, onError, onMessage } = wsActions;
      const token = getCookie('token')?.slice(7);
      if (type === wsInit && token) {
        socket = new WebSocket(`${wsUrl}?token=${token}`);
      }
      if (socket) {
        socket.onopen = () => {
          dispatch({ type: onOpen });
        };

        socket.onerror = () => {
          dispatch({ type: onError, payload: { code: -1, reason: 'Unexpected Error' } });
        };

        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;
          dispatch(updateFeedAction(restParsedData));
          dispatch({ type: onMessage, payload: restParsedData });
        };

        socket.onclose = ({code, reason }) => {
          dispatch({ type: onClose, payload: { code, reason } });
        };

        if (type === wsSendMessage) {
          const message = { ...payload, token };
          socket.send(JSON.stringify(message));
        }
      }

      next(action);
    };
  };
}

export {
  socketMiddleware
}
