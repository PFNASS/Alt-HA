import { createContext, useReducer } from "react";

const initialState = {
  authenticated: false,
  lastMessage: null,
  readyState: 3, // ReadyState.CLOSED
}
export const SocketContext = createContext(null);
export const SocketContextDispatch = createContext(null);

export default function SocketProvider({ children }) {
  const [socketState, dispatch] = useReducer(
    socketReducer,
    initialState
  );
  return (
    <SocketContext.Provider value={socketState}>
      <SocketContextDispatch.Provider value={dispatch}>
        {children}
      </SocketContextDispatch.Provider>
    </SocketContext.Provider>
  );
}

function socketReducer(state, action) {
  switch (action.type) {
    case 'SET_AUTH':
      return {
        ...state,
        authenticated: action.newAuthStatus,
        readyState: action.newReadyStatus
      };
    case 'SET_LAST_MESSAGE':
      return {
        ...state,
        lastMessage: action.payload,
      };
    case 'SET_READY_STATE':
      return {
        ...state,
        readyState: action.payload,
      };
    default:
      return state;
  }
};