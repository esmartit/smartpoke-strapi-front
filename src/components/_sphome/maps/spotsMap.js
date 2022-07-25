import React, { useState, useEffect } from "react";
import { VectorMap } from "react-jvectormap";
import { Col, Row, Card, CardBody } from "reactstrap";
import service from "../../../_spservices/_spconfigurations/spots.service";

import "../../../views/maps/VectorMap.css";
import valuesService from "../../../_spservices/_spsettings/_spbigdata/values.service";

var spotMap = {
    ES: Math.floor(Math.random() * (2500 - 350 + 1)) + 350,
    PE: Math.floor(Math.random() * (2500 - 350 + 1)) + 350,
};

function SpotsMap() {
  return (
    <Row>
      <Col sm={12} lg={12}>
        <Card>
          <CardBody>
            <h4 className="mb-4">Spots Map</h4>
            <VectorMap
              map={"world_mill"}
              backgroundColor="transparent"
              zoomOnScroll={false}
              markerStyle={{
                initial: {
                  fill: "#FFF",
                  stroke: "#383f47",
                },
              }}
              containerStyle={{
                width: "100%",
                height: "360px",
              }}
              containerClassName="map"
              regionStyle={{
                initial: {
                  fill: "transparent",
                  "fill-opacity": 0.9,
                  stroke: "#67757c",
                  "stroke-width": 1,
                  "stroke-opacity": 0.5,
                },
              }}
              series={{
                regions: [
                  {
                    values: spotMap,
                    scale: ["#EF5350", "#28A745"],
                  },
                ],
              }}
            />
          </CardBody>
          <CardBody>
            <table className="table vm font-14 mb-0 mt-4">
              <tbody>
                <tr>
                  <td className="border-top-0">Spain</td>
                  <td className="text-right font-medium border-top-0">58.5%</td>
                </tr>
                <tr>
                  <td className="border-top-0">Perú</td>
                  <td className="text-right font-medium">41.5%</td>
                </tr>
              </tbody>
            </table>
          </CardBody>          
        </Card>
      </Col>
    </Row>
  );
};

export default SpotsMap;

