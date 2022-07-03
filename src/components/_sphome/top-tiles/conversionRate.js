import React, { useState, useEffect } from "react";
import { Card, Col } from "reactstrap";

function ConversionRate() {

  const [data, setData] = useState({
        dataIn: 0,
        dataLimit: 0,
        dataOut: 0,
        dataTotal: 0
    });
  const [first, setFirst] = useState(true);
  const [total, setTotal] = useState(0);

  const getData = () => {
    setData({
        dataIn: Math.floor(Math.random() * (1500 - 12 + 1)) + 12,
        dataLimit: Math.floor(Math.random() * (1500 - 12 + 1)) + 12,
        dataOut: Math.floor(Math.random() * (1500 - 12 + 1)) + 12
    });
    setTotal(data.dataIn + data.dataLimit + data.dataOut);
    setFirst(false);
  };

  useEffect(() => {
    if (first) {
      getData();
      setFirst(false);
    } else {
      let i = setInterval(() => {
        getData();
      }, 15000);  
      return () => clearInterval(i);  
    }   
  }, [first]);

  return (
    <Col lg="12">
        <Card className="bg-info">
            <div className="row">
                <div className="col-lg-3 col-md-3">
                    <div className="p-3 active w-100 text-truncate">
                        <h6 className="text-white">
                        <span>
                            <i className="fas fa-chart-pie" /> TOTAL
                        </span>
                        </h6>
                        <h3 className="text-white m-b-0">{Intl.NumberFormat().format(total)}</h3>
                    </div>
                </div>
                <div className="col-lg-3 col-md-3">
                    <div className="p-3 w-100 text-truncate">
                        <h6 className="text-white">
                        <span>
                            <i className="fas fa-download" /> IN
                        </span>
                        </h6>
                        <h3 className="text-white m-b-0">{Intl.NumberFormat().format(data.dataIn)}</h3>
                    </div>
                </div>
                <div className="col-lg-3 col-md-3">
                    <div className="p-3 w-100 text-truncate">
                        <h6 className="text-white">
                        <span>
                            <i className="fas fa-exchange-alt" /> LIMIT
                        </span>
                        </h6>
                        <h3 className="text-white m-b-0">{Intl.NumberFormat().format(data.dataLimit)}</h3>
                    </div>
                </div>
                <div className="col-lg-3 col-md-3">
                    <div className="p-3 w-100 text-truncate">
                        <h6 className="text-white">
                        <span>
                            <i className="fas fa-upload" /> OUT
                        </span>
                        </h6>
                        <h3 className="text-white m-b-0">{Intl.NumberFormat().format(data.dataOut)}</h3>
                    </div>
                </div>
            </div>
        </Card>
    </Col >
  );
};

export default ConversionRate;
