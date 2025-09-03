import { useState, useCallback, useContext } from 'preact/hooks';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { SocketContext } from '../context/socketContext';
import { SocketContextDispatch } from '../context/socketContext';
import useWebSocket, { ReadyState } from 'react-use-websocket';
// import VirtualList from 'preact-virtual-list';

export default function SocketPage() {
  // const [socketAuth, setSocketAuth] = useState(false);
  const socketState = useContext(SocketContext);
  const socketDispatch = useContext(SocketContextDispatch);
  const [socketMessages, setSocketMessages] = useState([]);

//   const DATA = [{
//     name: 'Item 1'
//     }, {
//         name: 'Item 2'
//   }];

//   const Row = row => (
//     <div class="row">{row}</div>
//   );

    const renderRow = (row) => {
        return <div class="row">{row}</div>;
    }


  const OpenWebsocket = useCallback(() => {
    console.log("Opening Websocket");
    return new Promise((resolve) => {
        setTimeout(() => {
        resolve(`${import.meta.env.VITE_WS_URL}`);
        }, 2000);
    });
  }, []);

  const { sendMessage, lastMessage, readyState } = useWebSocket(OpenWebsocket, {
      onOpen: () => console.log("opening websocket"),
      onMessage: (event) => MessageReceived(event),
      shouldReconnect: (closeEvent) => true,
  });

  const sendAuthObject = useCallback(() => sendMessage(JSON.stringify({
      "type": "auth",
      "access_token": `${import.meta.env.VITE_TOKEN}`
  }), true));

  const MessageReceived = (e) => {
    const messageData = JSON.parse(e.data);
    console.log(`Message Received: ${messageData.type}`)
    if (messageData.type == "auth_required") {
        socketDispatch({
            type: 'SET_AUTH',
            newAuthStatus: false,
            newReadyState: 0
        })
        sendAuthObject();
        console.log("Sending Token to endpoint. ReadyState = CONNECTING")
    } else if (!socketState.authenticated && messageData.type == "auth_ok") {
        socketDispatch({
            type: 'SET_AUTH',
            newAuthStatus: true,
            newReadyState: 1
        })
        console.log("Connected to Websocket. ReadyState = OPEN")
    } else {
        setSocketMessages([...socketMessages, messageData]);
    }
  }

    const SubscribeToStateUpdates = useCallback(() => sendMessage(JSON.stringify({
        "id": 18,
        "type": "subscribe_events",
        "event_type": "state_changed"
    }), true));

  return (
    <div>
        {
            socketState.authenticated ? (
            <div>
                <Button onClick={SubscribeToStateUpdates} variant="contained">Subscribe to HA Events</Button>
                {/* <VirtualList sync class="list"
                    data={socketMessages}
                    rowHeight={40}
                    renderRow={renderRow}
                /> */}
            </div>
            ) : (
                <h1>Unauthenticated</h1>
            )
        }
    </div>
  );
}