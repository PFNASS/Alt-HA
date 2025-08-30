import React, { useState, useCallback, useEffect } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';

export const Socket = () => {
  //Public API that will echo messages sent to it back to the client
  const [socketUrl, setSocketUrl] = useState('http://192.168.1.124:8123/api/websocket');
  const [messageHistory, setMessageHistory] = useState([]);

  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl, {
      onOpen: () => {
        console.log("opening")
      },
      onMessage: (event) => MessageReceived(event),
      shouldReconnect: (closeEvent) => true,
  });

  const sendAuth = useCallback(() => sendMessage(JSON.stringify({
        "type": "auth",
        "access_token": `${import.meta.env.VITE_TOKEN}`
  }), true));

  const MessageReceived = (e) => {
    const messageData = JSON.parse(e.data);
    console.log(`Message Received: ${messageData.type}`)
    if (messageData.type == "auth_required") {
        sendAuth();
    }
  }

  const handleClickSendMessage = useCallback(() => sendMessage(JSON.stringify({
  "id": 19,
  "type": "get_states"
  }), true), []);

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];

  return (
    <div>
      <button
        onClick={handleClickSendMessage}
        disabled={readyState !== ReadyState.OPEN}
      >
        Click To Subscribe To Events'
      </button>
      <span>The WebSocket is currently {connectionStatus}</span>
      {lastMessage ? <span>Last message: {lastMessage.data}</span> : null}
      <ul>
        {messageHistory.map((message, idx) => (
          <span key={idx}>{message ? message.data : null}</span>
        ))}
      </ul>
    </div>
  );
};