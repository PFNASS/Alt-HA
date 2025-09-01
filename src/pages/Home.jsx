import { useContext } from "react";
import { SocketContext } from "../context/socketContext";

function HomePage() {
    const test = useContext(SocketContext)
    return (
        <>
        <h1>
            Home Test
        </h1>
        <h1>
            {console.log(test)}
        </h1>
        </>
    )
}

export default HomePage;