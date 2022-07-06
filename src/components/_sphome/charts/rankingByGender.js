import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { Card, CardBody } from "reactstrap";

function RankingGender() {
  const [genders, setGenders] = useState([]);
  const [first, setFirst] = useState(true);

  const gendersSeries = [];
  const gendersLabels = ['Women', 'Man'];

  const getGenders = () => {
    setGenders(2);
  };

  useEffect(() => {
    if (first) {
      getGenders();
    } else {
      let i = setInterval(() => {
        getGenders();
      }, 15000);
      return () => clearInterval(i);
    }
  }, [first]);

  for (let i = 0; i < genders; i++) {
    gendersSeries[i] = Math.floor(Math.random() * (1000 - 5) + 5);
  }

  const optionsGender = {
    chart: {
      id: "donut-chart",
    },
    grid: {
      padding: {
        left: 0,
        right: 0,
      },
    },
    plotOptions: {
      pie: {
        startAngle: 0,
        expandOnClick: true,
        offsetX: 0,
        offsetY: 0,
        customScale: 0.9,
        dataLabels: {
          offset: 0,
          minAngleToShowLabel: 5,
        },
        donut: {
          size: "80px",
          labels: {
            show: true,
          },
        },
      },
    },
    labels: gendersLabels,
    dataLabels: {
      enabled: true,
      style: {
        fontSize: "8px",
        fontFamily: "Helvetica, Arial, sans-serif",
      },
    },
    stroke: {
      width: 0,
    },
    legend: {
      show: true,
      position: "bottom",
      width: "50px",
      fontFamily: "'Montserrat', sans-serif",
    },
    colors: [
      "#9B59B6",
      "#3498DB",
      "#8abb6f",
    ],
    tooltip: {
      fillSeriesColor: false,
      formatter: "{b} : {c} ({d}%)",
    },
  };

  return (
    <Card>
      <CardBody>
        <h4 className="card-title mb-4">Ranking by Gender</h4>
        <div className="pb-4">
        {/* <div className="chart-wrapper"> */}
          <Chart
            options={optionsGender}
            series={gendersSeries}
            type="donut"
            height="320"
          />
        </div>
      </CardBody>
    </Card>
  );
};

export default RankingGender;
