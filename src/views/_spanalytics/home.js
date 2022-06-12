import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";

import {
    Card,
    CardBody
} from 'reactstrap';

function Home() {

    const [response, setResponse] = useState("");

    useEffect(() => {
      const socket = socketIOClient("/", {path: '/smartpoke/socket.io'});
      socket.on("smartpoke-device-presence", data => {
        setResponse(data);
      });
    }, []);
  
    return <div>
        <Card>
            <CardBody>
                <time dateTime={response}>{response}</time>
            </CardBody>
        </Card>
    </div>;
}

export default Home;
