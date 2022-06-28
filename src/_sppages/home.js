import React, { useState, useEffect } from "react";
import { Row, Col, Card, CardBody } from 'reactstrap';
import { 
  TopTilesVisitors,
  TopTilesRegistered,
  TopTilesMonthlyIN,
} from "../components/_sphome";

import socketIOClient from "socket.io-client";

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
        <Row>
          <Col sm={12} lg={8}>
            <TopTilesVisitors />
          </Col>
          <Col sm={12} lg={4}>
            <TopTilesRegistered />
          </Col>
        </Row>
        <Row>
          <Col sm={12} lg={4}>
            <TopTilesMonthlyIN />
          </Col>
          <Col sm={12} lg={8}>
          </Col>
        </Row>
    </div>;
};

export default Home;
