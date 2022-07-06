import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { Card, CardBody } from "reactstrap";

function RankingAge() {
  const [customers, setCustomers] = useState([]);
  const [first, setFirst] = useState(true);
  const ageRange = [];

  for (let x = 0; x <= 5; x++) {
    ageRange[x] = 0;
  }

  const getCustomerList = () => {
    setCustomers(50);
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

  for (let i = 0; i < customers; i++) {
    // let msDiff = new Date().getTime() - new Date(customers[i].birthDate).getTime();
    // let age = Math.floor(msDiff / (1000 * 60 * 60 * 24 * 365));
    let age = Math.floor(Math.random() * (66 - 25) + 25);

    if (age >= 0 && age < 26) ageRange[5] += 1;
    if (age >= 26 && age < 36) ageRange[4] += 1;
    if (age >= 36 && age < 46) ageRange[3] += 1;
    if (age >= 46 && age < 56) ageRange[2] += 1;
    if (age >= 56 && age < 66) ageRange[1] += 1;
    if (age >= 66) ageRange[0] += 1;  
  }

  const optionsAge = {
    colors: ["#3498DB"],
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: ["66+", "56-65", "46-55", "36-45", "26-35", "0-25"],
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
          text: "Ages",
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

  const seriesAge = [
    {
        name: "TOTAL",
        data: ageRange,
    },
  ];

  return (
    <Card>
      <CardBody>
        <h4 className="card-title mb-4">Ranking by Age</h4>
        <div className="chart-wrapper">
          <Chart
            options={optionsAge}
            series={seriesAge}
            type="bar"
            height="300"
          />
        </div>
      </CardBody>
    </Card>
  );
}

export default RankingAge;
