import React, { useState, useEffect } from "react";
import { Col } from "reactstrap";

import "./topTiles.css";

function NewVisitorsCount() {
  const [counter, updateCounter] = useState(0);
  const [first, setFirst] = useState(true);

  const getCounter = () => {
    updateCounter(345);
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
      <Col ld="4">
        <div className="d-flex">
          <div className="mr-2 align-self-center">
            <i className={"fas fa-mobile fa-2x op-3 text-dark"} />
          </div>
          <div className="align-self-center">
            <h6 className="text-dark mt-2 mb-2">New</h6>
            <h4 className="mt-0 text-dark">Loading...</h4>
          </div>
        </div>
      </Col>
    );
  }

  return (
    <Col ld="4">
      <div className="d-flex">
        <div className="mr-2 align-self-center">
          <i className={"fas fa-mobile fa-2x op-3 text-dark"} />
        </div>
        <div className="align-self-center">
        <h6 className="text-dark mt-2 mb-2">New</h6>
          <h4 className="mt-0 text-dark">{Intl.NumberFormat().format(counter)}</h4>
        </div>
      </div>
    </Col>
  );
}

export default NewVisitorsCount;
