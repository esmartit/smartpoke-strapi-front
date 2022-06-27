import React, { useState, useEffect } from "react";
import { Row, Col, Card, CardBody } from 'reactstrap';
import TopTilesVisitors from "../components/_sphome/top-tiles/topTilesVisitors";
import TopTilesRegistered from "../components/_sphome/top-tiles/topTilesRegistered";
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
    </div>;
};

export default Home;
