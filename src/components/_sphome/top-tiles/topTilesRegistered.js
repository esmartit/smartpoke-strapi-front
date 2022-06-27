import React from 'react';
import {
    Row,
    Card,
    CardBody
} from 'reactstrap';

import AllRegisteredCount from "./allRegisteredCount";
import TodayRegisteredCount from "./todayRegisteredCount";
// import NowRegisteredCount from "./nowRegisteredCount";

const TopTilesVisitors = () => {
    return (
        <Card>
            <CardBody>
                <h4 className="card-title mb-2">User Registered</h4>
                <Row>
                    <AllRegisteredCount />
                    <TodayRegisteredCount />
                    {/* <NowRegisteredCount /> */}
                </Row>
            </CardBody>
        </Card>
    );
}

export default TopTilesVisitors;