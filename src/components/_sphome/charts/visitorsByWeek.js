import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { Card, CardBody } from "reactstrap";

function VisitorsByWeek() {
  let inData = [];
  let limitData = [];
  let outData = [];
  let devices = [];
  let axisTime = [];  

  let dateS = new Date();
  let dateE = new Date();
  
  const optionsVisitor = {
    colors: ["#26B99A"],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '50px',
        endingShape: 'rounded'
      },
    },    
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: "bottom",
            offsetX: -10,
            offsetY: 0,
          },
        },
      },
    ],
    xaxis: {
      categories: axisTime,
      tickAmount: 15,
      labels: {
        style: {
          cssClass: "grey--text lighten-2--text fill-color",
        },
      },
    },
    yaxis: {
      title: {
        text: "Visitors",
        color: "#8898aa",
      },
      labels: {
        style: {
          cssClass: "grey--text lighten-2--text fill-color",
        },
      },
    },
    grid: {
      borderColor: "rgba(0,0,0,0.2)",
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      theme: "dark",
    },
    legend: {
      show: true,
      showForSingleSeries: true,
      position: "bottom",
      width: "50px",
      fontFamily: "'Montserrat', sans-serif",
    },
  };
  
  const seriesVisitor = [
    {
      name: "TOTAL",
      data: devices,
    }
  ];

  const [data, setData] = useState([]);
  const [week, setWeek] = useState(7);
  const [isMounted, setIsMounted] = useState(true);
  
  function handleChange(event) {
    setWeek(event.target.value);
  }

  dateS.setDate(dateE.getDate() - week);
    
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


  for (let i=0; i <= days; i++) {   
    inData[i] = Math.floor(Math.random() * (1500 - 12 + 1)) + 12;
    limitData[i] = Math.floor(Math.random() * (1500 - 12 + 1)) + 12;
    outData[i] = Math.floor(Math.random() * (1500 - 12 + 1)) + 12;
    devices[i] = inData[i] + limitData[i] + outData[i];
  }

  return (
    <div className="col-lg-12 col-md-12 col-sm-12">
      <Card>
        <CardBody>
          <div className="d-flex align-items-center">
            <div>
              <h4 className="card-title">Visitors By Week</h4>
            </div>
            <div className="ml-auto">
              <select className="custom-select" value={week} onChange={handleChange}>            
                <option value="7">Last 7 days</option>
                <option value="14">Last 2 weeks</option>
                <option value="21">Last 3 weeks</option>
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
                type="bar"
                height="350"
              />
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default VisitorsByWeek;
