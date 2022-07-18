import React, { useState, useEffect } from "react";
import GaugeChart from "react-gauge-chart";
import { Card, CardBody } from "reactstrap";
// import sseDailyGoalRegistered from "./sseDailyGoal";
import valueService from "../../../_spservices/_spsettings/_spbigdata/values.service";

const DailyGoalRegistered = () => {
  const [valueData, setValueData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      getValueList();
    }
  }, [loading]);

  const getValueList = () => {
    valueService
      .getByCode("daily_goal_registered")
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

  const registeredValue = !loading ? getValue() : 1;

  const optionsRegistered = {
    chart: {
      id: "gauge-chart",
    },
  };

  // const data = sseDailyGoalRegistered.useEventDailyGoal("http://localhost");
  const data = Math.floor(Math.random() * (875 - 25) + 25);;
  
  return (
    <Card>
      <CardBody>
        <div className="d-flex justify-content-center">
          <h4>Daily Goal Registered</h4>
        </div>
        <div className="d-flex justify-content-center">
          <h3><b>{Intl.NumberFormat().format(registeredValue)}</b></h3>
        </div>
      </CardBody>
      <CardBody>
        <div className="mt-4">
          <div className="">
            <GaugeChart
              options={optionsRegistered}
              nrOfLevels={6}
              arcPadding={0.015}
              cornerRadius={1}
              arcWidth={0.19}
              colors={["#EF5350", "#FFC107", "#28A745"]}
              percent={Math.round((data / registeredValue) * 100) / 100}
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

export default DailyGoalRegistered;
