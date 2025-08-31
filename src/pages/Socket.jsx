import { useCallback, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
// import { FixedSizeList } from 'react-window';
import { SocketInit } from '../socket/socket';
import useWebSocket, { ReadyState } from 'react-use-websocket';

export default function SocketPage() {
  const [socketAuth, setSocketAuth] = useState(false);

  const socketUrl = `${import.meta.env.VITE_WS_URL}`;

  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl, {
      onOpen: () => console.log("opening websocket"),
      onMessage: (event) => MessageReceived(event),
      shouldReconnect: (closeEvent) => true,
  });

  const StartWebSocket = () => {
    return { sendMessage, lastMessage, readyState };
  }

//   React.useEffect(() => {
//     if (!socketAuth) {
//         <Button onClick={StartWebSocket}>Authenticate Socket</Button>
//     } else {
//         console.log("Socket Authenticated")
//     }
//   }, [socketAuth]);

  const EstablishSocket()

  const sendAuth = useCallback(() => sendMessage(stringify({
        "type": "auth",
        "access_token": `${import.meta.env.VITE_TOKEN}`
  }), true));

  const MessageReceived = (e) => {
    const messageData = parse(e.data);
    console.log(`Message Received: ${messageData.type}`)
    if (!socketAuth && messageData.type == "auth_required") {
        sendAuth();
        console.log(messageData)
    }
  }

  const handleClickSendMessage = useCallback(() => sendMessage(stringify({
    "id": "19",
    "type": "get_states"
  }), true), []);

  return (
    <div>
        <h1>Socket Test</h1>
        {
            socketAuth ? (
                <Button onClick={handleClickSendMessage} variant="contained">Send Message</Button>
            ) : (
                <Button onClick={SocketInit()} variant="contained">Start Websocket</Button>
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