import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";

function App() {
  const [response, setResponse] = useState("");

  useEffect(() => {
    const socket = socketIOClient("/", {path: '/smartpoke/socket.io'});
    socket.on("smartpoke-device-presence", data => {
      setResponse(data);
    });
  }, []);

  return (
    <p>
      It's <time dateTime={response}>{response}</time>
    </p>
  );
}

export default App;