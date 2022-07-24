import React, { useState, useEffect } from "react";
import { VectorMap } from "react-jvectormap";
import { Card, CardBody } from "reactstrap";
import service from "../../../_spservices/_spconfigurations/spots.service";

import "../../../views/maps/VectorMap.css";
import valuesService from "../../../_spservices/_spsettings/_spbigdata/values.service";

var spotMap = {
    ES: Math.floor(Math.random() * (2500 - 350 + 1)) + 350,
    PE: Math.floor(Math.random() * (2500 - 350 + 1)) + 350,
    MX: Math.floor(Math.random() * (2500 - 350 + 1)) + 350,
    DK: Math.floor(Math.random() * (2500 - 350 + 1)) + 350
};

function SpotsMap() {
  return (
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
    </Card>
  );
};

export default SpotsMap;

