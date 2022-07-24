import React, { useState, useEffect } from "react";
import { Row, Col, Card, CardBody } from 'reactstrap';
import { 
  TopTilesVisitors,
  TopTilesRegistered,
  TopTilesMonthlyIN,
  TopTilesConversionRate,
  VisitorsWeek,
  VisitorsTime,
  TopCampaign,
  RankingBrand,
  RankingAge,
  RankingZipCode,
  RankingGender,
  DailyGoalVisitor,
  DailyGoalRegistered,
  DailyGoalCapacity,
  SpotsMap,
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
            <TopTilesConversionRate />
          </Col>
        </Row>
        <Row>
          <Col sm={12} lg={6}>
            <VisitorsWeek />
          </Col>
          <Col sm={12} lg={6}>
            <VisitorsTime />
          </Col>
        </Row>
        <Row>
          <Col sm={12} lg={6}>
            <TopCampaign />
          </Col>
          <Col sm={12} lg={6}>
            <RankingBrand />
          </Col>
        </Row>
        <Row>
          <Col sm={12} lg={4}>
            <RankingAge />
          </Col>
          <Col sm={12} lg={4}>
            <RankingZipCode />
          </Col>
          <Col sm={12} lg={4}>
            <RankingGender />
          </Col>
        </Row>
        <Row>
          <Col sm={12} lg={4}>
            <DailyGoalVisitor />
          </Col>
          <Col sm={12} lg={4}>
            <DailyGoalRegistered />
          </Col>
          <Col sm={12} lg={4}>
            <DailyGoalCapacity />
          </Col>
        </Row>
        <Row>
          <Col sm={12} lg={12}>
            <SpotsMap />
          </Col>
          <Col sm={12} lg={12}>
          </Col>
        </Row>
        <Card>
            <CardBody>
                <time dateTime={response}>{response}</time>
            </CardBody>
        </Card>
    </div>;
};

export default Home;
