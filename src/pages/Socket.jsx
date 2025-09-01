import { useCallback, useContext, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { SocketContext } from '../context/socketContext';
import { SocketContextDispatch } from '../context/socketContext';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { stringify } from 'structured-clone-es';

export default function SocketPage() {
  // const [socketAuth, setSocketAuth] = useState(false);
  const socketState = useContext(SocketContext);
  const socketDispatch = useContext(SocketContextDispatch);
  const socketUrl = `${import.meta.env.VITE_WS_URL}`;

  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl, {
      onOpen: () => console.log("opening websocket"),
      onMessage: (event) => MessageReceived(event),
      shouldReconnect: (closeEvent) => true,
  });

    const sendAuthObject = useCallback(() => sendMessage(JSON.stringify({
        "type": "auth",
        "access_token": `${import.meta.env.VITE_TOKEN}`
  }), true));

    // if (!socketState.authenticated) {
    //     const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl, {
    //         onOpen: () => console.log("opening websocket"),
    //         onMessage: (event) => MessageReceived(event),
    //         shouldReconnect: (closeEvent) => true,
    //     });
    // }

//   useEffect(() => {
//   },[socketState.authenticated])

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
        console.log(messageData)
    }
  }

//   const SubscribeToStateUpdates = () => {
//         useCallback(() => sendMessage(JSON.stringify({
//             "id": 18,
//             "type": "subscribe_events",
//         })));
//   }

    const SubscribeToStateUpdates = useCallback(() => sendMessage(JSON.stringify({
            "id": "18",
            "type": "subscribe_events",
    }), true));

    const handleClickSendMessage = useCallback(() => sendMessage(JSON.stringify({
        "id": "19",
        "type": "get_states"
    }), true));

  return (
    <div>
        <h1>Socket Test</h1>
        {
            socketState.authenticated ? (
                <Button onClick={handleClickSendMessage} variant="contained">Subscribe to HA Events</Button>
            ) : (
                <Button onClick={useContext} variant="contained">Start Websocket</Button>
            )
        }

    </div>
  );
}
//   );
//     }
//     <ListItem style={style} key={index} component="div" disablePadding>
//       <ListItemButton>
//         <ListItemText primary={`Item ${index + 1}`} />
//       </ListItemButton>
//     </ListItem>
//   );
// }

// export default function VirtualizedList() {
//   return (
//     <Box
//       sx={{ width: '100%', height: 400, maxWidth: 360, bgcolor: 'background.paper' }}
//     >
//       <FixedSizeList
//         height={400}
//         width={360}
//         itemSize={46}
//         itemCount={200}
//         overscanCount={5}
//       >
//         {renderRow}
//       </FixedSizeList>
//     </Box>
//   );
// }