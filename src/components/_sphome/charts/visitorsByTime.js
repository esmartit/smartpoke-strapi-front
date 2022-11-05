import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { Card, CardBody } from "reactstrap";

const VisitorByTime = () => {
  let inData = [];
  let limitData = [];
  let outData = [];
  let devices = [];
  let axisTime = [];  

  let dateS = new Date();
  let dateE = new Date();

  const optionsVisitor = {
    chart: {
      id: "basic-bar",
      type: "area",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    colors: ["#26B99A", "#34495E", "#bdc3c7", "#3498DB"],
    legend: {
      position: "bottom",
      horizontalAlign: "center",
      show: true,
    },
    markers: {
      size: 3,
      style: 'hollow',
    },
    xaxis: {
      categories: axisTime,
      tickAmount: 15,
    },
    grid: {
      borderColor: "rgba(0,0,0,0.2)",
    },
    tooltip: {
      theme: "dark",
    },
  };
  
  const seriesVisitor = [
    {
      name: "TOTAL",
      data: devices,
    },
    {
      name: "IN",
      data: inData,
    },
    {
      name: "LIMIT",
      data: limitData,
    },
    {
      name: "OUT",
      data: outData,
    },
  ];

  const [data, setData] = useState([]);
  const [time, setTime] = useState(14);
  const [isMounted, setIsMounted] = useState(true);

  
  function handleChange(event) {
    setTime(event.target.value);
  }

  dateS.setDate(dateE.getTime() - time);
    
  let d1 = new Date(dateS);
  let d2 = new Date(dateE);
  let days = Math.round((d2 - d1) / (1000 * 3600 * 24));
  for (let i=0; i <= days; i++) {
    let month = '' + (d1.getMonth() + 1);
    let day = '' + d1.getDate();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day =  '0' + day;
    axisTime[i] = [month, day].join('-');
    inData[i] = 0;
    limitData[i] = 0;
    outData[i] = 0;
    devices[i] = 0;
    d1 = new Date(d1.setDate(d1.getDate() + 1));
  };  

  const getData = () => {
    setData();
    setIsMounted(false);
  };

  useEffect(() => {
    if (isMounted) {
      getData();
      setIsMounted(false);
    } else {
      let i = setInterval(() => {
        getData();
      }, 15000);  
      return () => clearInterval(i);  
    }   
  }, [isMounted]);


  for (let i=0; i <= time; i++) {   
    inData[i] = Math.floor(Math.random() * (1500 - 12 + 1)) + 12;
    limitData[i] = Math.floor(Math.random() * (1500 - 12 + 1)) + 12;
    outData[i] = Math.floor(Math.random() * (1500 - 12 + 1)) + 12;
    devices[i] = inData[i] + limitData[i] + outData[i];
  }

  return (
      <Card>
          <CardBody>
              <div className="d-flex align-items-center">
              <div>
                  <h4 className="card-title">Visitors By Time</h4>
              </div>
              <div className="ml-auto">
                  <select className="custom-select" value={time} onChange={handleChange}>            
                  <option value="14">Last 15 min</option>
                  <option value="29">Last 30 min</option>
                  <option value="59">Last hour</option>
                  </select>
              </div>
              </div>
          </CardBody>
          <CardBody>
              <div className="mt-4">
                  <div className="">
                      <Chart
                      options={optionsVisitor}
                      series={seriesVisitor}
                      type="area"
                      height="350"
                      />
                  </div>
              </div>
          </CardBody>
      </Card>
  );
};

export default VisitorByTime;
