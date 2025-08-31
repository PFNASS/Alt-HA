import useWebSocket, { ReadyState } from 'react-use-websocket';

const SocketInit = () => {
  const socketUrl = `${import.meta.env.VITE_WS_URL}`;
  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl, {
    onOpen: () => console.log("opening websocket"),
    onMessage: (event) => MessageReceived(event),
    shouldReconnect: (closeEvent) => true,
  });
  return { sendMessage, lastMessage, readyState };
};

  const MessageReceived = (e) => {
    const messageData = parse(e.data);
    console.log(`Message Received: ${messageData.type}`)
    if (messageData.type == "auth_required") {
        sendAuth();
        console.log(messageData)
    }
  }

export default { SocketInit, MessageReceived };