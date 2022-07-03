import React, { useState, useEffect } from "react";
import { Card, Col } from "reactstrap";

import "./topTiles.css";

function TodayVisitorsCount() {
  const [counter, setCounter] = useState(0);
  const [first, setFirst] = useState(true);

  const getCounter = () => {
    setCounter(1234);
    setFirst(false);
  };

  useEffect(() => {
    if (first) {
      getCounter();
    } else {
      let i = setInterval(() => {
        getCounter();
      }, 15000);  
      return () => clearInterval(i);  
    }   
  }, [first]);

  if (!counter) {
    return (
      <Col lg="3">
        <Card className="bg-secondary">
          <div className="d-flex">
            <div className="col-lg-12 col-md-12">
              <div className="p-3 active w-100 text-truncate">
                  <h6 className="text-white">
                  <span>
                      <i className="fas fa-mobile" /> Today
                  </span>
                  </h6>
                  <h3 className="text-white m-b-0">Loading...</h3>
              </div>
            </div>
          </div>
        </Card>
      </Col>
    );
  }

  return (
    <Col lg="3">
        <Card className="bg-secondary">
          <div className="d-flex">
            <div className="col-lg-12 col-md-12">
              <div className="p-3 active w-100 text-truncate">
                  <h6 className="text-white">
                  <span>
                      <i className="fas fa-mobile" /> Today
                  </span>
                  </h6>
                  <h3 className="text-white m-b-0">{Intl.NumberFormat().format(counter)}</h3>
              </div>
            </div>
          </div>
        </Card>
    </Col>
  );
}

export default TodayVisitorsCount;
