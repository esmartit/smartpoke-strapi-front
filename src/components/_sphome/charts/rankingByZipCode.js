import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { Card, CardBody } from "reactstrap";

function RankingZipCode() {
  const [customers, setCustomers] = useState([]);
  const [first, setFirst] = useState(true);
  const zipCodes = [];
  const zipCodeList = [];

  for (let x = 0; x <= customers; x++) {
    zipCodeList[x] = Math.floor(Math.random() * (28999 - 28001) + 28001);
    zipCodes[x] = Math.floor(Math.random() * (1000 - 5) + 5);

  }

  const getCustomerList = () => {
    setCustomers(15);
    setFirst(false);
  };

  useEffect(() => {
    if (first) {
      getCustomerList();
    } else {
      let i = setInterval(() => {
        getCustomerList();
      }, 15000);
      return () => clearInterval(i);
    }
  }, [first]);

  const optionsZipCode = {
    colors: ["#745af2"],
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: zipCodeList,
      labels: {
        style: {
          cssClass: "grey--text lighten-2--text fill-color",
        },
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    grid: {
      borderColor: "rgba(0,0,0,0.1)",
    },
    yaxis: {
        title: {
          text: "ZipCodes",
          color: "#8898aa",
        },
        labels: {
          style: {
            cssClass: "grey--text lighten-2--text fill-color",
          },
        },
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

  const seriesZipCode = [
    {
        name: "TOTAL",
        data: zipCodes,
    },
  ];

  return (
    <Card>
      <CardBody>
        <h4 className="card-title mb-4">Ranking by ZipCode</h4>
        <div className="chart-wrapper">
          <Chart
            options={optionsZipCode}
            series={seriesZipCode}
            type="bar"
            height="300"
          />
        </div>
      </CardBody>
    </Card>
  );
}

export default RankingZipCode;
