import React, { useState, useEffect } from "react";
import GaugeChart from "react-gauge-chart";
import { Card, CardBody } from "reactstrap";
// import sseDailyGoalCapacity from "./sseDailyGoal";
import valueService from "../../../_spservices/_spsettings/_spbigdata/values.service";

const DailyGoalCapacity = () => {
  const [valueData, setValueData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (loading) {
      getValueList();
    }
  }, [loading]);

  const getValueList = () => {
    valueService
      .getByCode("daily_goal_capacity")
      .then((response) => {
        setValueData(response.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(true);
        console.log(err.message);
      });
  };

  function getValue() {
    let value = 0;
    valueData.map((data) => {
        value += parseInt(data.attributes.value);
      });
    return value
  };

  const capacityValue = !loading ? getValue() : 1;

  const optionsCapacity = {
    chart: {
      id: "gauge-chart",
    },
  };

  // const data = sseDailyGoalCapacity.useEventDailyGoal("http://localhost");
  const data = Math.floor(Math.random() * (5250 - 25) + 25);

  return (
    <Card>
      <CardBody>
        <div className="d-flex justify-content-center">
          <h4>Capacity</h4>
        </div>
        <div className="d-flex justify-content-center">
          <h3><b>{Intl.NumberFormat().format(capacityValue)}</b></h3>
        </div>
      </CardBody>
      <CardBody>
        <div className="mt-4">
          <div className="">
            <GaugeChart
              options={optionsCapacity}
              nrOfLevels={6}
              arcPadding={0.015}
              cornerRadius={1}
              arcWidth={0.19}
              colors={["#28A745", "#FFC107", "#EF5350"]}
              percent={Math.round((data / capacityValue) * 100) / 100}
              textColor={"#263238"}
              needleColor={"#B3B3B3"}
              needleBaseColor={"#B3B3B3"}
              marginInPercent={0.09}
            />
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default DailyGoalCapacity;
