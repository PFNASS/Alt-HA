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

function socketReducer(socket, action) {
  switch (action.type) {
    case 'SET_AUTH':
      return {
        ...state,
        authenticated: action.payload,
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
// const SocketInit = () => {
//   const socketUrl = `${import.meta.env.VITE_WS_URL}`;
//   const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl, {
//     onOpen: () => console.log("opening websocket"),
//     onMessage: (event) => MessageReceived(event),
//     shouldReconnect: (closeEvent) => true,
//   });

//     const MessageReceived = (e) => {
//     const messageData = parse(e.data);
//     console.log(`Message Received: ${messageData.type}`)
//     if (messageData.type == "auth_required") {
//         sendAuth();
//         console.log(messageData)
//     }
//   }

//   initialState.sendMessage = sendMessage;
//   initialState.lastMessage = lastMessage;
//   initialState.readyState = readyState;
//   return { sendMessage, lastMessage, readyState };
// };